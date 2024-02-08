import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  padding: 8px 16px;
  border: 1px solid violet;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = ({ onClick, children, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};

Button.defaultProps = {
  children: "Button",
};
