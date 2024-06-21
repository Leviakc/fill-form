import { handleFormSelection } from "../singleForm/handleFormSelection";
import { Link } from "../utils/getDomElements";

export const handleAutoSelection = ({ value }: Link) => {
  // console.log("handleAutoSelection");
  handleFormSelection(null, value);
};

export const handleAutoFormSelection = async ({ link }: Link) => {
  try {
    window.location.href = link;

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error(`Error processing form at ${link}:`, error);
  }
};
