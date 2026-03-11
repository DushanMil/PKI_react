'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let initialUsers = [
    { username: "dusan", password: "delecar123"},
    { username: "rados", password: "bajic321" },
    { username: "admin", password: "adminic" }
  ]

  let initialUserData = [
    { username: "dusan", password: "delecar123", type: "admin", name: "Dusan", surname: "Milovanovic", address: "Oslobodjenja 7", phone: "063 17 300 22" },
    { username: "rados", password: "bajic321", type: "admin", name: "Rados", surname: "Bajic", address: "Kukljin bb", phone: "067 804 557" },
    { username: "admin", password: "adminic", type: "admin", name: "Admin", surname: "Adminic", address: "Supervizorska 44", phone: "062 9630 8888" }
  ]
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState<UserData[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Check if userData exists in localStorage
    // This is needed for change password functionality
    if (localStorage.getItem("userData")) {
      setUsers(JSON.parse(localStorage.getItem("users")));
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
    else {
      // Users don't exist in localStorage, so add them
      localStorage.setItem("users", JSON.stringify(initialUsers));
      localStorage.setItem("userData", JSON.stringify(initialUserData));
      setUsers(initialUsers);
      setUserData(initialUserData);
    }

    // Clear all other items in localstorage
    const keysToKeep = ["users", "userData", "bikes"];
    Object.keys(localStorage).forEach((key: string) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  function loginUser(e) {
    e.preventDefault();

    // Find the user in users array
    const userExists = users.find(user => user.username === username && user.password === password);

    if (userExists) {       

      const userDetails = userData.find(user => user.username === username && user.password === password);

      localStorage.setItem("username", username);
      localStorage.setItem("loggedInUserDetails", JSON.stringify(userDetails));

      if (userDetails.type == "user") {
        router.push("/userHome");
      }
      else if (userDetails.type == "admin") {
        router.push("/adminHome");
      }
      else {
        Swal.fire({
          text: "Invalid user type.",
          icon: "error",
          iconColor: "red",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }

    } else {
        Swal.fire({
          text: "Pogrešni podaci.",
          icon: "warning",
          iconColor: "#959595",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      
    }
  }

  function changePassword(e) {
    e.preventDefault();
    localStorage.removeItem('usernameForPasswordChange');
    router.push("/changePasswordUsername");
  }

  return (
    <div className={styles.container}> 

      <main className={styles.main}>

        <h2>Login</h2>

        <h3>Uloguj se na svoj nalog</h3> 

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

          <p className={styles.label}>Šifra:</p>
          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <Image src="/lock.png" alt="Lock Icon" width={52} height={52} />
            </div>
            <input type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
          </div>

          <button className="btn" type="submit" onClick={loginUser}>Login</button>
          <button className="btn" type="submit" onClick={changePassword}>Promena lozinke</button>
        
        </div>
      </main> 

    </div>
  );
}
