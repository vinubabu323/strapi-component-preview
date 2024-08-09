import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  Typography,
  ModalLayout,
  ModalBody,
  ModalHeader,
} from "@strapi/design-system";

const preview = ({
  //All these parameters are passed from admin\src\index.js
  intlLabel,
  attribute,
}) => {
  const imageUrl =
    process.env.STRAPI_ADMIN_BACKEND_URL + "/" + attribute.options.url;
  const [isVisible, setIsVisible] = useState(false);
  const buttonLabel = intlLabel?.defaultMessage || "Preview";
  
  return (
    <Box>
      <Box paddingTop={2}>
        <Button onClick={() => setIsVisible((prev) => !prev)}>
          <Typography>{buttonLabel}</Typography>
        </Button>
      </Box>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              {buttonLabel}
            </Typography>
          </ModalHeader>
          <ModalBody style={{ height: "auto", maxHeight: "100vh" }}>
            <img style={{ width: "100%" }} src={imageUrl} />
          </ModalBody>
        </ModalLayout>
      )}
    </Box>
  );
};

//default value if no value is given

preview.defaultProps = {};

// validation
preview.propTypes = {
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }).isRequired,
  attribute: PropTypes.object.isRequired,
};

export default preview;
