import React from "react";
import styles from "./Birthday.module.css";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

function Birthday({ nome }) {
  return (
    <div className={styles.cardBirthday}>
      <LiaBirthdayCakeSolid />
      <div>
        <h1>É hoje!</h1>
        <p>Hoje é o aniversário de {nome}!</p>
      </div>
    </div>
  );
}

export default Birthday;
