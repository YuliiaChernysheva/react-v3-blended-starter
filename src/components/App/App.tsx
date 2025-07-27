import { useState } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openModal = (photo: Photo) => {
    setIsModalOpen(true);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const onSubmit = async (query: string) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = await getPhotos(query);
      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          {isModalOpen && selectedPhoto && (
            <Modal onClose={closeModal}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && (
            <PhotosGallery onClick={openModal} photos={photos} />
          )}
          {isLoading && <Loader />}

          {isError && (
            <Text textAlign="center" variant="error">
              Something went wrong...
            </Text>
          )}
        </Container>
      </Section>
    </>
  );
}
