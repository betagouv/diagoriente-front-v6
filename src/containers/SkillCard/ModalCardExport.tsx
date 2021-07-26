import React from 'react';
import ModalComponent from '../../components/design-system/Modal';
import ExportModalSvg from '../../assets/svg/modal_export.svg';
import Button from '../../components/design-system/Button';

type ModalExportProps = {
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
};

const ModalCardExport = ({ open, onClose, onSelect }: ModalExportProps) => {
  return (
    <ModalComponent onClose={() => onClose.call(null)} open={open}>
      <div className="flex flex-col justify-center items-center py-10">
        <img className="mb-6" src={ExportModalSvg} alt="Export Icon" />
        <h2 className="text-lena-pink-dark font-bold uppercase text-xl text-center">
          Exporter ma carte de compétences
        </h2>
        <div className="md:w-1/2 text-center mt-5 text-sm">
          Vous allez exporter votre carte de compétences.
          <br />
          Vous pouvez sélectionner les expériences et compétences que vous voulez voir apparaître, ou bien l’exporter
          dans sa totalité.
        </div>
        <div className="mt-10">
          <Button variant="primary">Exporter la carte complète</Button>
        </div>
        <div className="py-4">ou</div>
        <button
          onClick={() => {
            onSelect.call(null);
            onClose.call(null);
          }}
          className="text-lena-pink-dark text-sm underline cursor-pointer"
        >
          Exporter une sélection
        </button>
      </div>
    </ModalComponent>
  );
};

export default ModalCardExport;
