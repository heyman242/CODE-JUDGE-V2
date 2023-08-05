import {exec} from 'child_process';

const Docker = () => {
  return new Promise((resolve, reject) => {
    exec("docker run -i -d gcc", (error, stdout, stderr) => {
      if (error) {
        console.error("Error on DOCKER: ", error);
        reject(error);
      } else if (stderr) {
        console.error("Error on stderr: ", stderr);
        reject(stderr);
      } else {
        console.log("Docker stdout: ", stdout);
        resolve(stdout.trim());
      }
    });
  });
};

export default Docker;
