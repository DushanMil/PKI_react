"use client";
import { useEffect, useState, useMemo } from "react";
import styles from "./OfferPanel.module.css";
import { useRouter } from "next/navigation";
import { Calendar, Users } from 'lucide-react'; // icon library
import Swal from "sweetalert2";

interface OfferPanelProps {
  onToggleOffer: () => void;
  offer: EventItem;
}

export default function OfferPannel({ onToggleOffer, offer }: OfferPanelProps) {
  // This is an offer pannel that is used to display offer details
  // It's overlaid on top of other page elements
  // User can add comments and make an appointment for the offer

  const [userDetails, setUserDetails] = useState<UserData>()
  const [offers, setOffers] = useState<EventItem[]>([]);
  const [username, setUsername] = useState("");
  const [localOffer, setLocalOffer] = useState<EventItem>(offer);

  // comment form states
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState<number>(5);
  // const commentsRef = useRef<HTMLDivElement | null>(null);

  // Form for booking an offer
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    // Get user data from localStorage
    if (localStorage.getItem("userData")) {
      setUserDetails(JSON.parse(localStorage.getItem("loggedInUserDetails")));
      setUsername(localStorage.getItem("username"))
      setOffers(JSON.parse(localStorage.getItem("offers")))
    }
    setLocalOffer(offer);
  }, []);

  // const comments = useMemo(() => localOffer?.comments ?? [], [localOffer])

  // helper: persist
  const persist = (next: EventItem) => {
    setLocalOffer(next);
    console.log(next)

    // Also global array of offers needs to be updated
    const itemInList = offers.find(eventItem => eventItem.title == next.title &&
      eventItem.text == next.text &&
      eventItem.price == next.price &&
      eventItem.image == next.image &&
      eventItem.icon == next.icon)
    itemInList.comments = next.comments
    console.log(itemInList)
    setOffers(prev =>
      prev.map(i =>
        i.title === next.title &&
        i.text === next.text &&
        i.price === next.price &&
        i.image === next.image &&
        i.icon === next.icon ? { ...i, ...itemInList } : i
      )
    );
    localStorage.setItem("offers", JSON.stringify(offers))
  };

  // add comment handler
  const handleAddComment = () => {
    if (!localOffer) return;
    if (!userDetails) return;
    const trimmedName = userDetails.name + " " + userDetails.surname;
    const trimmedText = commentText.trim();
    if (!trimmedText) return; // don't add empty comment

    const newComment: CommentItem = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      user: trimmedName,
      image: username + ".png",
      stars: Math.max(1, Math.min(5, Math.round(rating))),
      text: trimmedText,
    };

    const updated: EventItem = {
      ...localOffer,
      comments: [newComment, ...localOffer.comments],
    };

    persist(updated);

    // clear form
    setCommentText('');
    setRating(5);
  };

  // click on star in form
  const onStarClick = (value: number) => setRating(value);

  // render stars (read-only) for a comment
  const renderStars = (count: number) => {
    const arr = new Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < count ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
    return <span className={styles.starsRow}>{arr}</span>;
  };

  if (!offer) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Booking an offer
  const handleConfirm = () => {
    if (!guests || !date) {
      Swal.fire({
        text: "Popunite sva polja.",
        icon: "warning",
        iconColor: "#959595",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }

    const booking = {
      username: username,
      location: offer.location,
      guests: guests,
      title: offer.title,
      image: offer.image,
      date: date,
      state: ""
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    localStorage.setItem('shoppingCart', JSON.stringify([...existing, booking]));

    Swal.fire({
      text: "Događaj dodat u korpu.",
      icon: "success",
      iconColor: "green",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <button className={styles.closeBtn} onClick={onToggleOffer}>
          ✕
        </button>
      </div>
      <h1 className={styles.title}>{localOffer.title}</h1>

      <div className={styles.contentRow}>
        {/* LEFT: big image */}
        <div className={styles.leftColumn}>
          <img src={localOffer.image} alt={localOffer.title} className={styles.mainImage} />
        </div>

        {/* CENTER: text, price, Zakazi, and comment form */}
        <div className={styles.centerColumn}>
          <div className={styles.offerBody}>
            <p className={styles.offerText}>{localOffer.text}</p>
            <p className={styles.offerPrice}>Cena: <strong>{localOffer.price}€</strong> po osobi</p>
            <button className={styles.bookBtn} onClick={() => setShowModal(true)}>
              Zakazi
            </button>
          </div>

          {/* Add comment form */}
          <div className={styles.addCommentSection}>
            <p>Ostavite komentar:</p>
            <div className={styles.commentForm}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={styles.textarea}
                rows={3}
              />
              <div className={styles.formRow}>
                <div className={styles.starsSelector}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const val = i + 1;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onStarClick(val)}
                        className={val <= rating ? styles.starBtnActive : styles.starBtn}
                        aria-label={`Rate ${val}`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
                <button onClick={handleAddComment} className={styles.sendBtn}>
                  Pošalji
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: comments list */}
        <div className={styles.rightColumn}>
          <div className={styles.commentsList}>
            {localOffer.comments.length === 0 && <p className={styles.noComments}>Još nema komentara.</p>}

            {localOffer.comments.map((c) => (
              <div key={c.id} className={styles.comment}>
                <img src={c.image} alt={c.user} className={styles.commentAvatar} />
                <div className={styles.commentRight}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentName}>{c.user}</span>
                  </div>
                  <div className={styles.commentText}>{c.text}</div>
                  <div className={styles.commentStars}>{renderStars(c.stars)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Zakazivanje događaja</h2>

            <div className={styles.formRow}>
              <div className={styles.legendColumn}>
                <label>Odabrani događaj:</label>
              </div>
              <div className={styles.inputColumn}>
                <p className={styles.eventTitle}>{offer.title}</p>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.legendColumn}>
                <Users className={styles.icon} />
                <label>Broj zvanica:</label>
              </div>
              <div className={styles.inputColumn}>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={styles.input}
                  min={1}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.legendColumn}>
                <Calendar className={styles.icon} />
                <label>Datum:</label>
              </div>
              <div className={styles.inputColumn}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={handleConfirm}>
                Potvrdi
              </button>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                Nazad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
