import { handleFormSelection } from "../singleForm/handleFormSelection";
import { Link } from "../utils/getDomElements";

export const handleAutoSelection = ({ value }: Link) => {
  handleFormSelection(null, value);
};

export const handleAutoFormSelection = async ({ link }: Link) => {
  try {
    window.location.href = link;
  } catch (error) {
    console.error(`Error processing form at ${link}:`, error);
  }
};
