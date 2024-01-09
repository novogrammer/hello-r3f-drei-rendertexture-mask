import styles from "./Footer.module.scss";


export function Footer(){
  return <>
    <section className={styles["Footer"]}>
      <h2 className={styles["Footer__title"]}>Footer</h2>
      <p className={styles["Footer__text"]}>The quick brown fox jumps over the lazy dog.</p>
      <p className={styles["Footer__copyright"]}>copyright here.</p>
    </section>
  </>;
}