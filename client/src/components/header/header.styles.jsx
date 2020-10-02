import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width:800px){
    height:60px;
    padding:10px;
    margin-bottom:20px;
}
 
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  svg{
    transform: scale(2.5);
    
  }
  @media screen and (max-width:1024px){
    width:45px;
    padding:0;
    padding-top:10px;
}
  @media screen and (max-width:300px){
    width:30px;
    padding:0;
    padding-top:10px;
}
@media screen and (min-width:1024px){
  svg{
    transform: scale(4.0);
    
  }
}

`;

export const OptionsContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

//   @media screen and (max-width:800px){
//     width:80%;
// }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  &:after {
    display:block;
    content: '';
    border-bottom: solid 3px #000000;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }

  &:hover:after{
    transform: scaleX(1);
  }



@media screen and (min-width:1024px)  {
  font-size:2rem;
}
@media screen and (max-width:1024px) and (min-width:900px) {
  font-size: 1.7rem;
}
@media screen and (max-width:900px) and (min-width:650px) {
  font-size: 1.3rem;
}
@media screen and (max-width:650px) and (min-width:500px) {
  font-size: 1.0rem;
}
@media screen and (max-width:400px){
  white-space: nowrap;
  font-size: 0.85rem;
  padding: 10px 10px;
}
  
`;
