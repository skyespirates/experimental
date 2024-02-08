import PropTypes from "prop-types";
import styled from "styled-components";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  column-gap: 8px;
  border: 1px solid black;
  border-radius: 5px;
`;

const List = ({ children, ...props }) => {
  return <StyledList {...props}>{children}</StyledList>;
};

List.propTypes = {
  children: PropTypes.any,
};

export default List;
