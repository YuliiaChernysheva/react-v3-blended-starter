import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

import style from "./Form.module.css";

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const handleSearch = (formData: FormData) => {
    const query = formData.get("search") as string;
    if (!query.trim()) {
      toast.error("Enter some text");
      return;
    }
    onSubmit(query);
  };
  return (
    <form className={style.form} action={handleSearch}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
