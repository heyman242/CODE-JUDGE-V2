import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  .problem-detail {
    flex: 0.7;
    padding-right: 1rem;
  }

  .ace-editor {
    flex: 1.2;
    min-height: 600px;
    margin-left: 0px;

    width: 120%;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

export default Wrapper;
