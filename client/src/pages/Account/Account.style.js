import styled from "styled-components";

export const Title = styled.div`
  width: 100%;
  text-align: right;
  border-bottom: 1px aliceblue solid;
  margin: 0 0 2rem 0;
`;

export const NameBioWrapper = styled.div`
  background-color: gray;
  width: clamp(350px, 30%, 600px);
  height: fit-content;
  margin-bottom: 2rem;
`;

// export const StyledCol = styled.div`
//   word-wrap: break-word;
//   border: 0.5px rgb(97, 97, 97) solid;
//   border-radius: 10px;
//   margin: 0.5rem 0.5rem 0.5rem 1rem;
//   padding: 0.5rem;
//   height: fit-content;
// `;

// export const Bio = styled.div`
//   padding: 1rem 0.5rem 1rem 0;
//   font-size: 1rem;
//   overflow-wrap: break-word;
// `;

export const Input = styled.input`
  /* width: 100%; */
`;

export const AvatarImg = styled.img`
  width: 300px;
  height: fit-content;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 0.5px rgb(97, 97, 97) solid;
  border-radius: 10px;
  padding: 0.5rem;
`;

export const Tooltiptext = styled.div`
  filter: opacity(0);
  width: 120px;
  background-color: #e47a83;
  color: #2e2e2e;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  ${AvatarContainer}:hover & {
    transition: all 0.5s;
    filter: opacity(1);
  }
`;
