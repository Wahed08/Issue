import styled from "styled-components";

//normal div container
export const DivContainer = styled.div`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

//signup login form
export const FormContainer = styled.div`
  top: 27%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    width: 30em;
    margin: 0.3em 0;
  }
`;

//signup login text in header section
export const HeaderContainer = styled.div`
  top: 20%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//already have an accout section
export const TextContainer = styled.div`
  display: inline-flex;
  margin-top: 3em;

  & a {
    margin-left: 20px;
    text-decoration: underline;
    font-size: 1em;
    font-weight: 400;

    &:hover {
      text-decoration: none;
    }
  }
`;
