const Footer = () => {
  return (
    <>
      <footer className="w-full px-6 border-t text-white">
        <div className="mx-auto py-6 flex flex-wrap md:flex-no-wrap justify-between items-center text-sm">
          &copy;{new Date().getFullYear()} Soundverse. All rights reserved.
          <div className="pt-4 md:p-0 text-center md:text-right text-xs">
            <a href="#" className="text-white no-underline hover:underline">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white no-underline hover:underline ml-4"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="text-white no-underline hover:underline ml-4"
            >
              Contact Us
            </a>
          </div>
        </div>

        <style jsx>
          {`
            footer {
              background: #464447;
            }
          `}
        </style>
      </footer>
    </>
  )
}

export default Footer
