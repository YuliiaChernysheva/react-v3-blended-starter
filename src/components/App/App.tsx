import Modal from "../Modal/Modal";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import Pagination from "../Pagination/Pagination";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleCreatePost = () => {
    setIsCreatePost(!isCreatePost);
  };

  const posts = data?.posts ?? [];
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => {
            toggleModal();
            toggleCreatePost();
          }}
        >
          Create post
        </button>
      </header>

      {isModalOpen && (
        <Modal
          onClose={() => {
            toggleModal();
            toggleCreatePost();
          }}
        >
          {isCreatePost && (
            <CreatePostForm
              onClose={() => {
                toggleModal();
                toggleCreatePost();
              }}
            />
          )}
        </Modal>
      )}

      {posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}
