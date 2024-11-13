import CameraIcon from '@assets/images/item/CameraIcon';
import Body1 from '@components/Body1';
import Caption2 from '@components/Caption2';

type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string;
  handleReturn: () => void;
};

const Modal = ({
  isModalOpen,
  closeModal,
  modalRef,
  handleImageChange,
  imagePreviewUrl,
  handleReturn,
}: Readonly<ModalProps>) => {
  return (
    <div
      className={`absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-[#2020204d] px-[40px] ${isModalOpen || 'hidden'}`}
      ref={modalRef}
    >
      <div className="w-full rounded-[14px] bg-white p-[32px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[4px]">
            <Body1 text="물품 반납" className="text-[1.8rem]" />
            <Caption2 text="반납할 물품을 사진 찍어 주세요" className="text-darkGray" />
          </div>
          <input
            className="hidden"
            type="file"
            name="image"
            id="image"
            capture="environment"
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleImageChange}
          />
          <label htmlFor="image">
            <div className="flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-[14px] border border-lightGray">
              {imagePreviewUrl ? (
                <img alt="반납 물품" src={imagePreviewUrl} className="h-full w-full object-cover" />
              ) : (
                <CameraIcon className="cursor-pointer" />
              )}
            </div>
          </label>
          <div className="flex items-center gap-[20px] self-end">
            <button type="button" onClick={closeModal}>
              <Body1 text="취소" />
            </button>
            <button type="button" onClick={handleReturn}>
              <Body1 text="반납" className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
