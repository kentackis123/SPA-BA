import styled from 'styled-components';

const AppWrap = styled.div`
    background-color: #0A4958;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 80px 0;
    p, h1, h2 {
        margin: 0;
    }
    h3 {
        color: #fff;
    }
    @media screen and (max-width: 600px) {
        padding: 30px 0;
    }
`;
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    h3 {
        color: #fff;
        font-size: 18px;
    }
    span {
        color: #F6E7D2;
        font-size: 16px;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;
const MapWrap = styled.div`
    width: 70%;
    height: 500px;
    margin: 0 auto;
    margin-top: 30px;
    @media screen and (max-width: 600px) {
        width: 100%;
        height: 300px;
    }
`;
const MarkerName = styled.h2`
    color: #fff;
    letter-spacing: 2px;
    border-right: 50px solid #0A4958;
    padding: 5px 0 5px 10px;
`;
const GridWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin-top: 30px;
    button {
        outline: none;
        color: #fff;
        background-color: #01B6AD;
        border: none;
        padding: 15px;
        letter-spacing: 2px;
        cursor: pointer;
        border-radius: 5px;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;
const Loading = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32px;
    background-color: #0A4958;
    ${({ visible }) => !visible && 'display: none' }
`

export {
  AppWrap, Grid, MapWrap, MarkerName, GridWrap, Container, Loading
};
