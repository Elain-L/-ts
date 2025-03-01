import styled from "styled-components"
import wrap_bg from "@/assets/img/wrap-bg.png"
export const RecommandWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${wrap_bg});
    display: flex;

    > .left {
      width: 689px !important;
      padding: 20px;
      width: 729px;
    }

    > .right {
      margin-left: 1px;
      width: 250px;
    }
  }
`
