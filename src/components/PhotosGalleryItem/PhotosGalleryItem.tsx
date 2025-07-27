import type { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
  photo,
  onClick,
}: PhotosGalleryItemProps) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
      >
        <img
          className={styles.image}
          src={photo.src.medium}
          alt={photo.alt}
          onClick={() => onClick(photo)}
        />
      </div>
    </GridItem>
  );
}
