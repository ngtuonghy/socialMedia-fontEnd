import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const PopoverContainer = styled.div`
  display: inline-block;
`;

const PopoverButton = styled.div`
  cursor: pointer;
  display: flex;
  padding-bottom: 4px;
`;

const PopoverContent = styled.div`
  position: fixed;
  width: ${({ width }) => width || "auto"};
  padding: 15px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transform: translateX(-100%);

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

const Popover = ({ buttonContent, children, width }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const updatePopoverPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: buttonRect.bottom,
        left: buttonRect.left + buttonRect.width + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (showPopover) {
      updatePopoverPosition();
      window.addEventListener("resize", updatePopoverPosition);
    } else {
      window.removeEventListener("resize", updatePopoverPosition);
    }

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
    };
  }, [showPopover]);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contentRef]);

  return (
    <PopoverContainer>
      <PopoverButton ref={buttonRef} onClick={togglePopover}>
        {buttonContent}
      </PopoverButton>
      {showPopover && (
        <PopoverContent
          ref={contentRef}
          width={width}
          top={popoverPosition.top}
          left={popoverPosition.left}
        >
          {children}
        </PopoverContent>
      )}
    </PopoverContainer>
  );
};

export default Popover;