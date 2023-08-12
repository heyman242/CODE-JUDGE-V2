import path from "path";
import { exec, spawn } from "child_process";
import Docker from "../DockerRun/startDocker.js";
import Problem from "../models/ProblemModel.js";

let containerId = null;
async function initializeDocker() {
  try {
    containerId = await Docker();
  } catch (error) {
    console.error("Error initializing Docker:", error);
  }
}
initializeDocker();

function execution(input, newId) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "docker",
      ["exec", "-i", `${containerId}`, `./${newId}.o`],
      {
        shell: true,
      }
    );

    child.stdin.write(input);
    child.stdin.end();
    child.on("error", (error) => {
      reject({ msg: "on error", error: JSON.stringify(error) });
    });

    child.stderr.on("data", (data) => {
      reject({ msg: "on stderr", stderr: `${data}` });
    });

    child.stdout.on("data", (data) => {
      const result = `${data}`.trim();
      resolve(result);
    });

    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
}

function compilationCpp(testCases, directory) {
  const { input, output } = testCases;
  console.log(input, output);
  console.log("Source file path:", directory);

  const newId = path.basename(directory).split(".")[0];

  return new Promise((resolve, reject) => {
    try {
      console.log(containerId, "conta");

      const dockerCpProcess = spawn("docker", [
        "cp",
        `${directory}`,
        `${containerId}:/${newId}.cpp`,
      ]);

      dockerCpProcess.on("close", (code) => {
        if (code === 0) {
          // File copied successfully, continue with g++ compilation
          exec(
            `docker exec ${containerId} g++ "${newId}.cpp" -o "${newId}.o"`,
            async (error, stdout, stderr) => {
              if (error) {
                reject({
                  status: "Compilation Error",
                  msg: "on error",
                  error: JSON.stringify(error),
                  stderr,
                });
              } else if (stderr) {
                reject({ status: "Runtime Error", msg: "on stderr", stderr });
              } else {
                for (let index = 0; index < input.length; index++) {
                  const result = await execution(input[index], newId);
                  if (result !== output[index]) {
                    return reject({
                      status: "Wrong_Answer",
                      msg: `incorrect output at test case ${index + 1}`,
                      input: `${input[index]}`,
                      output: `${output[index]}`,
                      yourOutput: `${result}`,
                    });
                  }
                }
                resolve({
                  status: "Problem Solved Successfully",
                  msg: "All test cases passed",
                  stdout: JSON.stringify(stdout),
                });
              }
            }
          );
        } else {
          reject(new Error(`docker cp process exited with code ${code}`));
        }
      });

      dockerCpProcess.on("error", (error) => {
        reject(error);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export default compilationCpp;
