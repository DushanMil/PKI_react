'use client'

import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let users = [
    { username: "dusan", password: "delecar123"},
    { username: "rados", password: "bajic321" }
  ]

  let userData = [
    { username: "dusan", password: "delecar123", name: "Dusan", surname: "Milovanovic", address: "Oslobodjenja 7", phone: "063 17 300 22" },
    { username: "rados", password: "bajic321", name: "Rados", surname: "Bajic", address: "Kukljin bb", phone: "067 804 557" }
  ]

  const router = useRouter();

  function loginUser(e) {
    e.preventDefault();

    // ako sam upamtila tog usera sa izmenjenim podacima
    const storedUser = localStorage.getItem(username);
    if(storedUser) {
      try {
        const u = JSON.parse(storedUser);    
        if (u.username === username && u.password === password) {  

          console.log("to je taj " + username + " " + password)

          localStorage.setItem("username", u.username);
          localStorage.setItem("password", u.password);

          localStorage.setItem("name", u.name);
          localStorage.setItem("surname", u.surname);
          localStorage.setItem("address", u.address);
          localStorage.setItem("phone", u.phone);

          router.push("/userHome"); 
        } else {
          Swal.fire({
            text: "Pogrešni podaci.",
            icon: "warning",
            iconColor: "#959595",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
          return;
        }
      } catch(error) {
        console.log("Error parsing user data:", error);
      } 
      return;
    }  
    
    // ako useru nisu menjani podaci: 
    const userExists = users.find(user => user.username === username && user.password === password);

    if (userExists) {
      //localStorage.clear();        

      const userDetails = userData.find(user => user.username === username && user.password === password);

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      localStorage.setItem("name", userDetails.name);
      localStorage.setItem("surname", userDetails.surname);
      localStorage.setItem("address", userDetails.address);
      localStorage.setItem("phone", userDetails.phone);

      router.push("/userHome"); 

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
          <button className="btn" type="submit" onClick={loginUser}>Promena lozinke</button>
        
        </div>
      </main> 

    </div>
  );
}
