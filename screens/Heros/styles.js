import styled from "styled-components/native";

export const Container = styled.View`
   width: 100%;
   height: 100%;
   flex: 1;
   background-color: #fff;
   align-items: center;
   justify-content: space-around;

`;

export const ViewPersonagens = styled.View`
    width: 98%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`;

export const ViewImagem = styled.View`
    /* margin-top: -50%; */
`;

export const ViewPaginas = styled.View`
   width: 90%;
   /* height: auto; */
   margin-top: 100px;
   align-items: center;
   justify-content: space-around;
   flex-direction: row;

`;

export const ViewTeste = styled.View`
    height: 100%;
   
`;

export const Imagem = styled.Image`
    width: 130%;
    height: 50%;
    justify-content: space-around;
    object-fit: contain ;

`;

export const ImagemVs = styled.Image`
    width: 80px;
    height: 80px;
    position: relative;
    margin-top: -50%;
`;

export const ViewButton = styled.View`
    width: 40%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: brown;
`;

export const ButtonImg = styled.TouchableOpacity`
    width: 110px;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: blanchedalmond;
`;