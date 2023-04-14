import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import styled from "styled-components";

const Nav = () => {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};

  const [show, handleShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initialUserData);

  const location = useLocation().state;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") {
          navigate("/main");
        }
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll());
    };
  }, []);

  useLayoutEffect(() => {
    if (location) setSearchValue(location.value);
    inputRef.current.focus();
  });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const inputRef = useRef();
  console.log(inputRef);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`, {
      state: { value: e.target.value },
    });
  };
  console.log(location);
  // console.log("useLocation/search ===> ", useLocation.search);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log("result --->", result);
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        navigate(`/`);
      })
      .catch((error) => {
        console.error();
      });
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus App"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            ref={inputRef}
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="검색해주세요!"
          />

          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 3px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  /* text-align: center;
  font-size: 16px; */
  padding: 7px;
  border: none;

  &:focus:-moz-placeholder {
    color: transparent;
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  text-align: center;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const Nav = () => {
//   const [show, handleShow] = useState(false);
//   const { pathname } = useLocation();
//   const [searchValue, setSearchValue] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     // ⬇️ 컴포넌트를 사용하지 않을 때 호출
//     return () => {
//       window.removeEventListener("scroll", handleScroll());
//     };
//   }, []);

//   const handleScroll = () => {
//     if (window.scrollY > 50) {
//       handleShow(true);
//     } else {
//       handleShow(false);
//     }
//   };

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//     navigate(`/search?q=${e.target.value}`);
//   };

//   return (
//     <NavWrapper show={show}>
//       <Logo>
//         <img
//           alt="Disney Plus App"
//           src="/images/logo.svg"
//           onClick={() => (window.location.href = "/")}
//         />
//       </Logo>
//       {pathname === "/" ? (
//         <Login>Login</Login>
//       ) : (
//         <Input
//           value={searchValue}
//           onChange={handleChange}
//           className="nav__input"
//           type="text"
//           placeholder="검색해주세요!"
//         />
//       )}
//     </NavWrapper>
//   );
// };

// export default Nav;

// const Login = styled.a`
//   background-color: rgba(0, 0, 0, 0.6);
//   padding: 8px 16px;
//   text-transform: uppercase;
//   letter-spacing: 3px;
//   border: 1px solid #f9f9f9;
//   transition: all 0.2s ease 0s;
//   cursor: pointer;

//   &:hover {
//     background-color: #f9f9f9;
//     color: gray;
//     border-color: transparent;
//   }
// `;

// const Input = styled.input`
//   position: fixed;
//   left: 50%;
//   transform: translate(-50%, 0);
//   background-color: rgba(0, 0, 0, 0.582);
//   border-radius: 5px;
//   color: white;
//   /* text-align: center;
//   font-size: 16px; */
//   padding: 7px;
//   border: none;

//   &:focus:-moz-placeholder {
//     color: transparent;
//   }
// `;

// const NavWrapper = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 70px;
//   /* background-color: #090b13; */
//   background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 36px;
//   letter-spacing: 16px;
//   z-index: 3;
// `;

// const Logo = styled.a`
//   padding: 0;
//   width: 80px;
//   margin-top: 4px;
//   max-height: 70px;
//   font-size: 0;
//   display: inline-block;

//   img {
//     display: block;
//     width: 100%;
//   }
// `;
