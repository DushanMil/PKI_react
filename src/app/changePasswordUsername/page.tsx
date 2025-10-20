'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ChangePasswordUsernamePage() {
  const [username, setUsername] = useState("");

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    console.log("useEffect")
    if (localStorage.getItem("userData")) {
      console.log("nasao userData")
      setUsers(JSON.parse(localStorage.getItem("users")));
      setUserData(JSON.parse(localStorage.getItem("userData")));

      console.log(users)
    }
  }, []);

  const router = useRouter();

  function nextPageForPasswordChange(e) {
    e.preventDefault();
    if (username.trim() === "") {
      Swal.fire({
        text: "Unesite korisničko ime.",
        icon: "warning",
        iconColor: "#959595",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
    console.log(users)
    console.log(username)
    // Check if a user with the entered username exists
    const userExists = users.find(user => user.username === username);
    if (!userExists) {
      Swal.fire({
        text: "Korisničko ime ne postoji.",
        icon: "warning",
        iconColor: "#959595",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
    // Username is valid, proceed to next page
    localStorage.setItem("usernameForPasswordChange", username);
    router.push("/nextPageForPasswordChange");
  }

  return (
    <div className={styles.container}> 

      <main className={styles.main}>

        <h2>Promena lozinke</h2>

        <h3>Unesi svoje korisničko ime</h3> 

        <div className={styles.loginForm}>
          <p className={styles.label}>Korisničko ime:</p>
          <div className={styles.inputGroup}>
            
            <div className={styles.iconWrapper}>
              <Image src="/user.png" alt="User Icon" width={40} height={40} />
            </div>
            <input type="text"  
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
          </div> 

          <button className="btn" type="submit" onClick={nextPageForPasswordChange}>Dalje</button>
        </div>
      </main> 

    </div>
  );
}
