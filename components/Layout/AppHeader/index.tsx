import styles from './index.module.css';
export type AppHeaderProps = Record<string, unknown>;

const AppHeader = (props: AppHeaderProps): JSX.Element => {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;
  return <nav className={styles.navigation}></nav>;
};

export default AppHeader;
