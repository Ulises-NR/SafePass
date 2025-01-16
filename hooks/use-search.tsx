import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { changePage } from "@/store/slices/passwordSlice";
import { useAppDispatch } from "@/store";

export const useSearch = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { page } = {
      page: parseInt(searchParams.get("page") as string, 10) || 1,
    };

    async function fetchUrls() {
      dispatch(changePage(page));
    }

    fetchUrls();
  }, [searchParams, dispatch]);

  const handlePageChange = (parameter, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(`${parameter}`, value);
    window.history.pushState({}, "", url);
  };

  return {
    handlePageChange,
  };
};
