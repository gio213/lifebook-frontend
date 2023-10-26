import { Ring, RingElement1, RingElement2, RingElement3 } from "./Spiner.style";

const Spiner = () => {
  return (
    <Ring className="lds-ring">
      <RingElement1 />
      <RingElement2 />
      <RingElement3 />
    </Ring>
  );
};

export default Spiner;
