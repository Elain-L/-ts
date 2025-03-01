import styled from "styled-components"
import footerImages from "@/assets/img/foot_enter_new2.png"
export const FooterWraper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  .footer-top {
    margin-top: 65px;
    display: flex;
    justify-content: center;
    .footer-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 45px;
        height: 45px;
        background: url(${footerImages}) no-repeat;
        background-position: -170px -5px;
        background-size: 220px 220px;
        &:hover {
          background-position: -5px -115px;
        }
      }
      .desc {
        display: inline-block;
        width: 100px;
        margin-top: 10px;
        font-weight: 400;
        font-size: 12px;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .footer-footer {
    margin-top: 55px;
    .tiaokaun {
      display: flex;
      justify-content: center;
      .text:hover {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      }
      .divider {
        margin: 0 10px;
      }
    }
    .kefu {
      display: flex;
      justify-content: center;
      & span {
        margin: 10px 10px;
      }
    }
    .xvckezheng {
      text-align: center;
    }
    .banquan {
      margin-top: 10px;
      text-align: center;
    }
  }
`
