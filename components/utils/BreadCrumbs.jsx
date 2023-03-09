import { Breadcrumbs } from "@mantine/core";
const Breadcrumb = ({ items }) => {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      {/* Custom Separator */}
      {/* <Breadcrumbs separator="→">{items}</Breadcrumbs> */}
    </>
  );
};

export default Breadcrumb;
