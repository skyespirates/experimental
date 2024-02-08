import styled from "styled-components";
import PropTypes from "prop-types";
const StyledInput = styled.input`
  border: 1px solid violet;
  border-radius: 5px;
  outline-style: none;
  padding: 8px 16px;
`;

const Input = ({ value, placeholder, onChange, ...props }) => {
  return (
    <StyledInput
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
