import { MapContainer } from 'react-leaflet';
import styled from "styled-components";

export const StyledMapContainer = styled(MapContainer)`
  width: 1200px;
  height: 800px;
  position: relative;
`;

export const PageContainer = styled.div`
  display: grid;
  gap: 16px;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 100%;
  height: 100%;

`;