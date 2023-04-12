import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // 모달 창 안을 클릭 하면 무시해야 하기 때문에 return;
      // ref.current.contains(event.target) => 내부를 클릭했다는 코드
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      //   console.log("event.target ===>", event.target);
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    //이 컴포넌트가 더 이상 사용 되지 않을 때 등록해준 Listener를 제거해주어야 하기 때문에 remove~
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
