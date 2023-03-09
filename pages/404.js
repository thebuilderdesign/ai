
const ErrorPage = () => {
  return (
    <div>        <style jsx>
    {`
    p {
      display: block;
      width: fit-content;
      text-align: center;
      font-family: monospace;
      font-size: 1.5rem;
      margin: 0 auto;
      padding: 0 20px;
      border-radius: 10px;

      filter: var(--text-shadow);
      color: red;
    }

    a {
        display: block;
      width: fit-content;
      text-align: center;
      font-family: monospace;
      font-size: 1rem;
      margin: 0 auto;
      padding: 0 20px;
      border-radius: 10px;
      filter: var(--text-shadow);
      color: white;
    }


    @media screen and (max-width: 768px) {
        p {
            font-size: 1rem;
        }
    }
  `}
  </style>
        <p>Error 404</p>
        <a href='/'>Go Back to Home Page</a>

    </div>
  )
}

export default ErrorPage