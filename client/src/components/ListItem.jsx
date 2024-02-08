import PropTypes from "prop-types";
import styled from "styled-components";

const StyledListItem = styled.li`
  border: 1px solid black;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItem = ({ children, ...props }) => {
  return <StyledListItem {...props}>{children}</StyledListItem>;
};

ListItem.propTypes = {
  children: PropTypes.any,
};

export default ListItem;
