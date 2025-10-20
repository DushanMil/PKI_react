'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NextPageForPasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  // username for password change
  const [usernameForPasswordChange, setUsernameForPasswordChange] = useState("");

  // used to add strings to a div dynamically
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    // Get user data from localStorage
    if (localStorage.getItem("userData")) {
      setUsers(JSON.parse(localStorage.getItem("users")));
      setUserData(JSON.parse(localStorage.getItem("userData")));
      setUsernameForPasswordChange(localStorage.getItem("usernameForPasswordChange"));
    }
  }, []);

  const router = useRouter();

  function changePassword(e) {
    // clear all items in the content array
    setContent([]);

    // check if usernameForPasswordChange exists
    if (usernameForPasswordChange === null) {
      setContent((prev) => [...prev, "Doslo je do greske, pokusajte ponovo"]);
      e.preventDefault();
      return;
    }

    // check if new password has atleast 10 characters
    if (newPassword.length < 10) {
      setContent((prev) => [...prev, "Nova lozinka mora imati najmanje 10 karaktera"]);
      e.preventDefault();
      return;
    }

    // check if old password is correct
    const user = users.find(user => user.username === usernameForPasswordChange && user.password === oldPassword);
    if (!user) {
      setContent((prev) => [...prev, "Pogresna stara lozinka"]);
      e.preventDefault();
      return;
    }

    // check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setContent((prev) => [...prev, "Pogresno uneta nova lozinka"]);
      e.preventDefault();
      return;
    }

    // all checks passed, change the password
    const userToUpdate = userData.find(user => user.username === usernameForPasswordChange && user.password === oldPassword);
    user.password = newPassword;
    userToUpdate.password = newPassword;
    setUsers([...users]);
    setUserData([...userData]);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.removeItem('usernameForPasswordChange');
    
    setContent((prev) => [...prev, "Bar 10 karaktera!"]);
    setContent((prev) => [...prev, "Uspesno promenjena lozinka!"]);

    router.push("/");
  }

  return (
    <div className={styles.container}> 

      <main className={styles.main}>

        <h2>Promena lozinke</h2>

        <h3>Unesi novu lozinku ispod da bi promenio lozinku</h3> 

        <div className={styles.loginForm}>
          <p className={styles.label}>Stara lozinka*</p>
          <div className={styles.inputGroup}>
            
            <div className={styles.iconWrapper}>
              <Image src="/padlock.png" alt="User Icon" width={45} height={45} />
            </div>
            <input type="password"  
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  />
          </div> 

          <p className={styles.label}>Nova lozinka*</p>
          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Image src="/key.png" alt="Lock Icon" width={52} height={52} />
            </div>
            <input type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
          </div>

          <p className={styles.label}>Unesi ponovo novu lozinku*</p>
          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Image src="/lock.png" alt="Lock Icon" width={52} height={52} />
            </div>
            <input type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
          </div>

          <div className={styles.messageField}>
            <p>Šifra mora sadržati:</p>
            {content.map((text, i) => {
              let icon = "";
              let color = "";

              if (text === "Nova lozinka mora imati najmanje 10 karaktera" ||
                  text === "Doslo je do greske, pokusajte ponovo" ||
                  text === "Pogresna stara lozinka" ||
                  text === "Pogresno uneta nova lozinka"
              ) {
                icon = "❌"
                color = "red"
              } else {
                icon = "✔"
                color = "green"
              }


              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color }}>{icon}</span>
                  <p style={{ color }}>{text}</p>
                </div>
              )
            })}
          </div>

          <button className="btn" type="submit" onClick={changePassword}>Promeni lozinku</button>
        
        </div>
      </main> 

    </div>
  );
}
