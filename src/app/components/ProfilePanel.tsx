"use client";
import { useEffect, useState } from "react";
import styles from "./ProfilePanel.module.css";
import { useRouter } from "next/navigation";

export default function ProfilePanel({ onToggleUserDetails }: { onToggleUserDetails: () => void }) {
  // This is a profile panel that is displayed above other
  // content on the page when the user clicks on their profile icon.
  // It slides in from the right and has a grey overlay behind it.
  // There is no logic for opening/closing the panel in this snippet.
  // There should be logic for getting and updating user data.

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  
  // logged in user
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    phone: ""
  });


  useEffect(() => {
    // Get user data from localStorage
    if (localStorage.getItem("userData")) {
      setUsers(JSON.parse(localStorage.getItem("users")));
      setUserData(JSON.parse(localStorage.getItem("userData")));
      setUsername(localStorage.getItem("username"));
      const storedDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"));
      setUserDetails({
        username: storedDetails?.username ?? "",
        password: storedDetails?.password ?? "",
        name: storedDetails?.name ?? "",
        surname: storedDetails?.surname ?? "",
        email: storedDetails?.email ?? "",
        phone: storedDetails?.phone ?? "",
      });
    }
  }, []);


  function changeUserAttribute(attribute, value) {
    setUserDetails({ ...userDetails, [attribute]: value });

    const userToUpdate = users.find(user => user.username === username);
    const userDataToUpdate = userData.find(user => user.username === username);
    if (attribute === "username") {
      userToUpdate[attribute] = value;
      setUsername(value);
    }
    userDataToUpdate[attribute] = value;
    setUsers([...users]);
    setUserData([...userData]);
  }

  function saveChanges(e) {
    e.preventDefault();

    // Set changed user details to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("loggedInUserDetails", JSON.stringify(userDetails));
    localStorage.setItem("username", username);
    
    onToggleUserDetails();
  }

  return (
    <div className={styles.profileContainer}>
      {/* Grey overlay */}
      <div className={styles.overlay}></div>

      {/* Slide-out panel */}
      <div className={styles.sidePanel}>
        <div>
          <p className={styles.profileTitle}>Informacije o korisniku</p>
          <div className={styles.profileHeader}>
            <img src={`/${userDetails.username}.png`} alt="User" className={styles.profilePhoto} />
          </div>
        </div>
        <div className={styles.profileDetails}>
          <label className={styles.detailLabel}>Ime:</label>
          <input
            className={styles.detailInput}
            type="text"
            value={userDetails.name}
            onChange={(e) => changeUserAttribute("name", e.target.value)}
          />
          <label className={styles.detailLabel}>Prezime:</label>
          <input
            className={styles.detailInput}
            type="text"
            value={userDetails.surname}
            onChange={(e) => changeUserAttribute("surname", e.target.value)}
          />
          <label className={styles.detailLabel}>Telefon:</label>
          <input
            className={styles.detailInput}
            type="text"
            value={userDetails.phone}
            onChange={(e) => changeUserAttribute("phone", e.target.value)}
          />
          <label className={styles.detailLabel}>Email adresa:</label>
          <input
            className={styles.detailInput}
            type="text"
            value={userDetails.email ?? ""}
            onChange={(e) => changeUserAttribute("email", e.target.value)}
          />
          <label className={styles.detailLabel}>Korisničko ime:</label>
          <input
            className={styles.detailInput}
            type="text"
            value={userDetails.username}
            onChange={(e) => changeUserAttribute("username", e.target.value)}
          />
        </div>

        <div className={styles.profileActions}>
          <button className={styles.btn} onClick={saveChanges}>Potvrdi izmene</button>
          <button className={styles.btn} onClick={onToggleUserDetails}>Nazad</button>
        </div>
      </div>
    </div>
  );
}
