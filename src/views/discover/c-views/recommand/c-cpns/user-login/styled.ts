import styled from "styled-components"

export const LoginWrapper = styled.div`
  height: 180px;
  background-position: 0 0;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(102, 99, 99, 0.1);
  > img {
    width: 250px;
    height: 90px;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    line-height: 25px;
  }

  a {
    margin-top: 10px;
    display: inline-block;
    width: 100px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    color: #fff;
    text-decoration: none;
    background-position: 0 -195px;
    text-shadow: 0 1px 0 #8a060b;

    :hover {
      background-position: -110px -195px;
    }
  }
`
