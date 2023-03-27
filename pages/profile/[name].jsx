import Navbar from "../../components/utils/AuthNavbar";
import Link from "next/link";
import { ProfileCard } from "../../components/utils/ProfileCard";
import {
  Avatar,
  Container,
  Blockquote,
  Indicator,
  Divider,
  Paper,
  Pagination,
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme,
  Menu,
  createStyles,
  Table,
  Title,
  Button,
  Group,
  Text,
  List,
  Anchor,
  Rating,
  Tooltip,
  Popover,
} from "@mantine/core";
import { MdLocationPin } from "react-icons/md";
import AppFooter from "../../components/Application/AppFooter";
import AppHeader from "../../components/Application/AppHeader";
const SharedProfile = ({ name, bio, avatarUrl }) => {
  return (
    <>
      <AppHeader />
      <main className="">
        {/* <ProfileCard /> */}
        <section className="relative block h-[30rem]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-30 bg-primary"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-80"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-200">
          <Container size="xl">
            <div className="mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative ">
                        <Avatar
                          src="https://images.unsplash.com/photo-1523673671576-35ff54e94bae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fGFmcmljYW4lMjBhbWVyaWNhbiUyMHdvbWFufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                          alt="Profile"
                          radius={200}
                          mx="auto"
                          mt={-10}
                          className="shadow-xl hover:shadow-2xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-none border-white"
                          size={158}
                        />
                      </div>
                      {/* <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1585890483046-9461ebc1dace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFmcmljYW4lMjBhbWVyaWNhbiUyMHdvbWFufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                          className="shadow-2xl rounded-full h-32  absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-none"
                        />
                      </div> */}
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <Button>Connect</Button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Requests
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            10
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Provision
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            89
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700 ">
                      Frank Laud
                    </h3>
                    <div className="sm:text-sm text-xs leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                      <MdLocationPin className=" mr-2  text-xs sm:text-lg text-primary opacity-50" />
                      Akompi Street, Accra - GH
                    </div>
                    <div className="mb-2 text-gray-600 mt-6">
                      <MdLocationPin className=" mr-2  text-xs sm:text-lg text-primary opacity-50" />
                      franklaud@gmail.com
                    </div>
                    <div className="mb-2 text-gray-600">
                      <i className="fas fa-university mr-2 text-lg text-gray-400"></i>
                      Let's talk
                    </div>
                  </div>
                  <div className="mt-10 py-2 border-t border-gray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <Blockquote
                          color="green"
                          cite="– Frank Laud"
                          className="text-sm"
                        >
                          Hello, I'm Frank Laud, a dedicated service provider at
                          ServiceHub. As a janitor, I take pride in maintaining
                          a clean and safe environment for all employees and
                          visitors. With an eye for detail and a strong work
                          ethic, I am committed to ensuring that ServiceHub
                          remains a welcoming and productive space. I am always
                          willing to go above and beyond to meet the needs of my
                          colleagues and clients, and I am excited to continue
                          contributing to the success of this dynamic
                          organization.
                        </Blockquote>

                        <a
                          href="#pablo"
                          className="font-normal text-primary"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <AppFooter />
    </>
  );
};

export default SharedProfile;
