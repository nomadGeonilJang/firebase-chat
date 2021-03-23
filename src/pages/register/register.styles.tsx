import styled from "styled-components";

export const RegisterContainer = styled.article`

    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    background: #0e101c;
    padding: 0 20px;

    h2{
        color:white;
        margin-bottom:15px;
        text-transform:uppercase;
    }
    form {
        width:100%;
        max-width: 400px;
        margin: 0 auto;
    }

    button[type="button"] {
        background: black;
        border: 1px solid white;
    }


    input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 4px;
        border: 1px solid white;
        padding: 10px 15px;
        margin-bottom: 10px;
        font-size: 14px;
    }

    label {
        line-height: 2;
        text-align: left;
        display: block;
        margin-bottom: 13px;
        margin-top: 20px;
        color: white;
        font-size: 1.2rem;
        font-weight: 400;
        letter-spacing:1.2px;
    }

    button,
    input[type="submit"] {
        background: #ec5990;
        color: white;
        text-transform: uppercase;
        border: none;
        margin-top: 40px;
        padding: 20px;
        font-size: 16px;
        font-weight: 100;
        letter-spacing: 10px;
    }


    input[type="submit"]:hover {
        background: #bf1650;
    }
    input[type="submit"]:disabled {
        background: gray;
    }
    p{
        color:red;
        font-size:1.1rem;
    }
    a{
        color:white;
        font-size:1.3rem;
        margin-top:15px;
        text-transform:uppercase;
    }
`;