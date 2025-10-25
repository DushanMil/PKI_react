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
    { username: "dusan", password: "delecar123", type: "user", name: "Dusan", surname: "Milovanovic", address: "Oslobodjenja 7", phone: "063 17 300 22" },
    { username: "rados", password: "bajic321", type: "user", name: "Rados", surname: "Bajic", address: "Kukljin bb", phone: "067 804 557" },
    { username: "admin", password: "adminic", type: "admin", name: "Admin", surname: "Adminic", address: "Supervizorska 44", phone: "062 9630 8888" }
  ]
  let initialNotifications = [
    { username: "dusan", title: "Novo u Kafani kod Španca:", message: "Uz prethodno organizovane dve proslave trecu dobijate gratis", image: "bag.png" },
    { username: "dusan", title: "Potvrđeno zakazivanje događaja", message: "Događaj: Vlaška svadba je uspešno zakazan.", image: "message.png" },
    { username: "rados", title: "Craaaazy title:", message: "sanity check", image: "money.png" },
    { username: "dusan", title: "Neverovatno niske cene:", message: "U podrumu nađena crvotocina koja vodi u 2018. godinu. Nije davno ali je sve bilo mnogo jeftinije", image: "money.png" },
    { username: "dusan", title: "Potvrđeno zakazivanje događaja", message: "Događaj: Veridba kod bata Mile je uspešno zakazan.", image: "message.png" },
  ]
  let initialShoppingCart = [
    { username: "dusan", location: "Požarevac", guests: "700", title: "Vlaška svadba", image: "vlaska.png", date: "13.6.2025.", state: ""},
    { username: "dusan", location: "Svilajnac", guests: "300", title: "BG Žurka", image: "bgZurka.png", date: "14.6.2025.", state: ""},
    { username: "rados", location: "Trstenik", guests: "700", title: "Sin dragan se ženi", image: "trstenik.png", date: "15.6.2025.", state: ""},
    { username: "dusan", location: "Petlovac", guests: "500", title: "Veridba", image: "petlovac.png", date: "16.6.2025.", state: ""},
    { username: "dusan", location: "Beč", guests: "900", title: "Koncert DM", image: "dragana.png", date: "17.6.2025.", state: ""},
  ]
  // Sample data for offers, to have something to show
  let initialOffers = [
    { title: "Svadba", 
      text: "Proslavite početak zajedničkog života u prelepom ambijentu Kafane kod Španca. Gosti će biti oduševljeni neverovatnom ponudom hrane i pića", 
      price: "50", image: "veridba_carousel.jpg", icon: "wedding.png", location: "Plaza", comments: []},
    { title: "Žurka", 
      text: "Nezaboravan provod za mlade sa tehno muzikom i jeftinim picem ... ", 
      price: "20", image: "zurka_carousel.jpg", icon: "party.png", location: "Svilajnac", comments: []},
    { title: "Vlaška svadba", 
      text: "Kao svadba samo mnogo jaca jer ima pevaljku, masni hranu, svadbarski kupu, trubace, bacanje para i ccigane", 
      price: "30", image: "vlaska_carousel.jpg", icon: "vlach.png", location: "Kucevo", comments: []},
    { title: "Koncert DM", 
      text: "Provedite nezaboravno vece na koncertu Dragane Mirkovic. U separeu vac ceka pice vase je samo da dodjete.", 
      price: "100", image: "dragana_carousel.jpg", icon: "party.png", location: "Bec", comments: []},
    { title: "nesto nesto", 
      text: "Proslavite početak zajedničkog života u prelepom ambijentu Kafane kod Španca. Gosti će biti oduševljeni neverovatnom ponudom hrane i pića", 
      price: "100", image: "veridba_carousel.jpg", icon: "party.png", location: "Plaza", comments: []},
    { title: "nesto drugo", 
      text: "Proslavite početak zajedničkog života u prelepom ambijentu Kafane kod Španca. Gosti će biti oduševljeni neverovatnom ponudom hrane i pića", 
      price: "50", image: "veridba_carousel.jpg", icon: "party.png", location: "Plaza", comments: []},
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
    // Add notifications data
    if (!localStorage.getItem("notifications")) {
      localStorage.setItem("notifications", JSON.stringify(initialNotifications));
    }
    // Add shopping cart items data
    if (!localStorage.getItem("shoppingCart")) {
      localStorage.setItem("shoppingCart", JSON.stringify(initialShoppingCart));
    }
    // Add offers data
    if (!localStorage.getItem("offers")) {
      localStorage.setItem("offers", JSON.stringify(initialOffers));
    }

    // Clear all other items in localstorage
    const keysToKeep = ["users", "userData", "notifications", "shoppingCart", "offers"];
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
