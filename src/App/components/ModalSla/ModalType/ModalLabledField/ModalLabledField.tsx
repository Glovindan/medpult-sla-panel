import React, { useEffect, useState } from "react";

interface ModalLabledFieldProps extends React.PropsWithChildren{
  label: string;
  isRequired?: boolean;
}

/** Поле с названием */
export default function ModalLabledField({label, isRequired, children}: ModalLabledFieldProps) {
  return (
    <div className="modal-labled-field__left">
      <span className={`modal-labled-field__label ${isRequired ? "medpult-required" : ""}`}>
        {label}
      </span>
      <div className="modal-labled-field__select">
        {children}
      </div>
    </div>
  );
}
