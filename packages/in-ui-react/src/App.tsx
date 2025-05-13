/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AcademicCapIcon,
  ArchiveBoxXMarkIcon,
  ArrowsUpDownIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  MoonIcon,
  PlusCircleIcon,
  PlusIcon,
  SunIcon,
  TrashIcon,
  UserGroupIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BeakerIcon, FolderIcon, WifiIcon } from "@heroicons/react/24/solid";
import {
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Container,
  Divider,
  Dock,
  Drawer,
  Dropdown,
  Dropzone,
  Empty,
  FilterType,
  Filters,
  Heading,
  HelperText,
  Icon,
  Input,
  Label,
  Link,
  List,
  LoadingLine,
  Logo,
  Modal,
  Navbar,
  Notification,
  ObjectFilterType,
  OptionType,
  Overlay,
  PageHeader,
  Pagination,
  Radio,
  Result,
  Select,
  Skeleton,
  Stepper,
  Table,
  Tag,
  TextArea,
  Theme,
  ThemeProvider,
  Title,
  TitleWithIcon,
  Tooltip,
  UploadButton,
  UploadInput,
  fileToBase64,
  themes,
  useFilters,
  useTheme,
  useUploadButtonState,
} from "./lib";

const Nav = () => {
  const LogoWithTheme = () => {
    const { theme } = useTheme();
    return <Logo name="ei" theme={theme} />;
  };
  return (
    <Navbar paddingX="both">
      <div className="flex items-center w-full h-full">
        <LogoWithTheme />
        <div className="flex justify-center w-full">
          <Dock>
            <Dock.Item active icon={<FolderIcon />} label="Fund">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam nobis eveniet nostrum accusantium quasi enim omnis!
                  Velit dolore illum praesentium. Blanditiis sunt explicabo
                  ducimus. Repellat aperiam officia quae maxime reiciendis,
                  quaerat cupiditate deserunt iusto est. Ab, tempore omnis
                  maiores natus placeat similique aliquid incidunt temporibus
                  officiis, illum, atque beatae? Magnam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam nobis eveniet nostrum accusantium quasi enim omnis!
                  Velit dolore illum praesentium. Blanditiis sunt explicabo
                  ducimus. Repellat aperiam officia quae maxime reiciendis,
                  quaerat cupiditate deserunt iusto est. Ab, tempore omnis
                  maiores natus placeat similique aliquid incidunt temporibus
                  officiis, illum, atque beatae? Magnam.
                </p>
              </div>
            </Dock.Item>
            <Dock.Item icon={<WifiIcon />} label="Deals information">
              <div className="w-full max-w-lg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam nobis eveniet nostrum accusantium quasi enim omnis!
                  Velit dolore illum praesentium. Blanditiis sunt explicabo
                  ducimus. Repellat aperiam officia quae maxime reiciendis,
                  quaerat cupiditate deserunt iusto est. Ab, tempore omnis
                  maiores natus placeat similique aliquid incidunt temporibus
                  officiis, illum, atque beatae? Magnam.
                </p>
              </div>
            </Dock.Item>
            <Dock.Item
              icon={<BeakerIcon />}
              as="a"
              href="https://www.google.com"
              target="_blank"
              label="Market analysis"
            />
          </Dock>
        </div>
      </div>
    </Navbar>
  );
};

const ThemeSelect = () => {
  const { theme, changeThemeTo } = useTheme();
  const themesToSelect = themes.map((themeKey) => ({
    label: themeKey.replace("-", " "),
    value: themeKey as Theme,
  }));

  return (
    theme && (
      <Select
        label="Select a theme"
        className="mb-6"
        color="over-ghost"
        defaultValue={{ label: theme?.replace("-", " "), value: theme }}
        value={{ label: theme?.replace("-", " "), value: theme }}
        options={themesToSelect}
        onChange={(value) => {
          value && changeThemeTo(value?.value);
        }}
      />
    )
  );
};

const FilterSection = () => {
  const { filteredOptions, onApply } = useFilters({
    analyst: [
      "715c85fc-440c-47a4-919c-0f340f641f16",
      "aeab01a9-29ec-48af-8083-8fb453dd1741",
    ],
    status: "",
    search: "",
    date: {
      from_date: "",
      to_date: "",
    },
  });

  const pageFilters: FilterType<OptionType>[] = [
    {
      name: "fund",
      key: "fund",
      type: "simple-select",
      options: [],
    },
    {
      name: "status",
      key: "status",
      type: "simple-select",
      unDeletable: true,
      options: [
        { label: "PRE-SCREENING", value: "PRE-SCREENING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "PENDING IC", value: "PENDING IC" },
      ],
    },
    {
      name: "phase",
      key: "phase",
      type: "simple-select",
      options: [
        { label: "SCREENING", value: "SCREENING" },
        { label: "LOI", value: "LOI" },
        { label: "PSA", value: "PSA" },
        { label: "DD", value: "DD" },
        { label: "CLOSING", value: "CLOSING" },
        { label: "CLOSED", value: "CLOSED" },
        { label: "DEAD", value: "DEAD" },
      ],
    },
    {
      name: "market",
      key: "market",
      type: "multi-select",
      options: [
        { label: "Northern New Jersey", value: "northern_new_jersey" },
        { label: "New York Metro", value: "new_york_metro" },
        { label: "LA", value: "la" },
        { label: "Inland Empire", value: "inland_empire" },
        { label: "East Bay", value: "east_bay" },
        { label: "Carlsbad/San Diego", value: "carlsbad/san_diego" },
        { label: "Seattle", value: "seattle" },
        { label: "Miami", value: "miami" },
        { label: "Fort Lauderdale", value: "fort_lauderdale" },
        { label: "DC Metro", value: "dc_metro" },
      ],
    },
    {
      name: "officer",
      key: "officer",
      type: "multi-select",
      options: [
        {
          label: "Test Officer 1",
          value: "ff66e491-33a5-49b4-a573-9068fa1d56c7",
        },
        {
          label: "Greg Skaler",
          value: "ede129e7-a84f-4449-a2a4-944e3a49bdb9",
        },
        {
          label: "Jhon Mosley",
          value: "c5919501-8de0-42d5-86f0-a370c96c3b7b",
        },
        {
          label: "James Lambert",
          value: "b31c80ea-d1be-42b0-963a-59d2fbd59105",
        },
      ],
    },
    {
      name: "analyst",
      key: "analyst",
      type: "multi-select",
      unDeletable: true,
      options: [
        {
          label: "Test Analyst 1",
          value: "715c85fc-440c-47a4-919c-0f340f641f16",
        },
        {
          label: "Josh Sabbagh",
          value: "aeab01a9-29ec-48af-8083-8fb453dd1741",
        },
        {
          label: "Zach Gerry",
          value: "467957d7-ad1f-49d4-9804-6badd72460d1",
        },
      ],
    },
    {
      name: "Search",
      key: "search",
      type: "text",
      unDeletable: true,
    },
  ];

  pageFilters.push({
    type: "custom",
    key: "date",
    name: "Date",
    render: ({ onApply, isLoading }) => {
      return (
        <div className="flex flex-col gap-2 p-2">
          <Input
            label="From"
            type="date"
            color="over-ghost"
            name="from_date"
            value={(filteredOptions?.date as ObjectFilterType)?.from_date}
            loading={isLoading}
            onChange={(e) => {
              const toDateValue = (filteredOptions?.date as ObjectFilterType)
                ?.to_date;

              const fromDate = {
                from_date: e?.target?.value,
              };

              const date = toDateValue
                ? {
                    ...fromDate,
                    to_date: toDateValue,
                  }
                : fromDate;

              onApply({
                ...filteredOptions,
                date: {
                  ...date,
                },
              });
            }}
          />
          <Input
            label="To"
            type="date"
            name="to_date"
            color="over-ghost"
            value={(filteredOptions?.date as ObjectFilterType)?.to_date}
            loading={isLoading}
            onChange={(e) => {
              const fromDateValue = (filteredOptions?.date as ObjectFilterType)
                ?.from_date;

              const toDate = {
                to_date: e?.target?.value,
              };

              const date = fromDateValue
                ? {
                    from_date: fromDateValue,
                    ...toDate,
                  }
                : toDate;

              onApply({
                ...filteredOptions,
                date: {
                  ...date,
                },
              });
            }}
          />
        </div>
      );
    },
  });

  return (
    <>
      <Filters
        filters={pageFilters}
        filteredOptions={filteredOptions}
        onApply={(filter) => onApply(filter)}
        hideTitle
        autoInitialFocus={false}
      />
      <Filters
        filters={pageFilters}
        filteredOptions={filteredOptions}
        kind="glass"
        size="small"
        onApply={(filter) => onApply(filter)}
      />
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [headerDrawer, setHeaderDrawer] = useState(false);
  const [buttonGroupActive, setButtonGroupActive] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const valuesTags: Array<string> = [
    "Lorem ipsum dolor sit amet.",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag 5",
  ];
  const [tags, setTags] = useState(valuesTags);
  const [file, setFile] = useState<any>("");
  const [files, setFiles] = useState<Array<File>>([]);
  const uploadButtonState = useUploadButtonState();
  const uploadButtonStateBase64 = useUploadButtonState();

  useEffect(() => {
    if (uploadButtonStateBase64.files.length > 0) {
      fileToBase64(uploadButtonStateBase64.files[0]).then((data) =>
        console.log(data)
      );
    }
  }, [uploadButtonStateBase64.files]);

  const fileInput = useRef<any>();
  const [error, setError] = useState<string | false>("");
  const validate = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError("This input is required");
    } else if (e.target.value.length < 5) {
      setError("Min 5");
    } else {
      setError(false);
    }
  };

  const showDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const toggleLoading = () => {
    setLoading((value) => !value);
    setTimeout(() => {
      setLoading((value) => !value);
    }, 15000);
  };

  const currentColor = "primary";
  interface Person {
    value: string;
    name: string;
  }
  const persons: Person[] = [
    { value: "nick", name: "Nick" },
    { value: "jesus", name: "Jesus" },
  ];

  const deleteTag = (id?: string) => {
    const newTags = tags.filter((_, index) => index !== Number(id));
    setTags(newTags);
  };

  const deleteFile = (id?: string) => {
    const newFiles = files?.filter((_, index) => index !== Number(id));
    setFiles(newFiles);
  };

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const listData = [
    ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
    ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
  ];
  const [current, setCurrent] = useState(1);
  const [steps, setSteps] = useState<
    Array<{
      step: number;
      title: string;
      description?: string;
      status: string;
      disabled: boolean;
    }>
  >([
    {
      step: 1,
      title: "Name of step 1",
      status: "base",
      disabled: false,
    },
    {
      step: 2,
      title: "Name of step 2",
      description: "Text helper step",
      status: "base",
      disabled: true,
    },
    {
      step: 3,
      title: "Name of step 3",
      description: "Text helper step",
      status: "base",
      disabled: true,
    },
  ]);

  const nextStep = () => {
    setSteps(
      steps?.map((item) => {
        if (item?.step === current) {
          return {
            ...item,
            status: "ready",
          };
        }
        if (current + 1 === item?.step) {
          return {
            ...item,
            status: "active",
          };
        }
        return item;
      })
    );
    setCurrent(current + 1);
  };

  const changeStatusStep = () => {
    setSteps((steps) => {
      const index = steps.findIndex((item) => item?.step === current);
      return [
        ...steps.slice(0, index),
        {
          ...steps?.[index],
          status: "ready",
        },
        ...steps.slice(index + 1, steps?.length),
      ];
    });
  };

  const PageHeaderMenu = () => {
    const ItemWithTheme = () => {
      const { setNextTheme, theme } = useTheme();
      return (
        <PageHeader.Item
          as="button"
          icon={theme?.includes("dark") ? <MoonIcon /> : <SunIcon />}
          onClick={setNextTheme}
        >
          Change Theme
        </PageHeader.Item>
      );
    };
    return (
      <>
        <PageHeader.Item
          as="a"
          active={active}
          icon={<PlusCircleIcon />}
          onClick={() => setActive(!active)}
        >
          Lorem Ipsum
        </PageHeader.Item>
        <PageHeader.Item icon={<XCircleIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
        <ItemWithTheme />
      </>
    );
  };

  const ToggleThemeButton = () => {
    const { toggleTheme } = useTheme();

    return (
      <Button onClick={toggleTheme} color={currentColor} className="mr-3">
        Change theme
      </Button>
    );
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 0,
      tolerance: 40,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 0,
      tolerance: 40,
    },
  });

  const defaultSensors = useSensors(mouseSensor, touchSensor);

  return (
    <>
      <Nav />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu />}
      >
        <Heading>Lorem Ipsum</Heading>
        <Heading>Lorem Ipsum</Heading>
      </PageHeader>

      <Container>
        <FilterSection />
        <MultiContainerSortable />
        <DndTable prefix="a" />
        <h5 className="mb-4 text-light">Base buttons</h5>
        <div className="flex flex-wrap mb-7">
          <Button
            color={currentColor}
            loading={loading}
            onClick={toggleLoading}
            className="mr-3"
          >
            Base
          </Button>
          <Button
            type="submit"
            icon={<TrashIcon />}
            color={currentColor}
            className="mr-3"
          >
            default icon position
          </Button>
          <Button
            icon={<PlusIcon />}
            color={currentColor}
            iconPosition="right"
            className="mr-3"
          >
            icon right
          </Button>
          <Button
            icon={<PlusIcon />}
            color={currentColor}
            onlyIcon
            className="mr-3"
          >
            hi
          </Button>
          <Button disabled color={currentColor} className="mr-3">
            disabled
          </Button>
          <ToggleThemeButton />
          <Button kind="solid" color={currentColor} className="mr-3">
            Nothing
          </Button>
        </div>
        <h5 className="mb-4 text-light">Button Group</h5>
        <div className="flex flex-wrap mb-7">
          <ButtonGroup
            active={buttonGroupActive}
            items={[
              {
                key: "all",
                text: "All",
                icon: <CheckIcon />,
                onClick: (key) => setButtonGroupActive(key),
              },
              {
                key: "lease",
                text: "Lease comps",
                icon: <CheckIcon />,
                onClick: (key) => setButtonGroupActive(key),
              },
              {
                key: "sale",
                text: "Sale comps",
                icon: <CheckIcon />,
                onClick: (key) => setButtonGroupActive(key),
              },
            ]}
          />
        </div>
        <h5 className="mb-4 text-light">Upload Button</h5>
        <div className="flex flex-wrap mb-7">
          <UploadButton
            state={uploadButtonState}
            buttonProps={{ color: currentColor }}
            multiple={true}
            className="mr-3"
          >
            Upload File
          </UploadButton>

          <UploadButton
            state={uploadButtonStateBase64}
            buttonProps={{ color: currentColor, kind: "outline" }}
            className="mr-3"
          >
            Upload File (base64)
          </UploadButton>
        </div>
        <h5 className="mb-4 text-light">Dropdown</h5>
        <div className="flex flex-wrap justify-end mb-7">
          <Dropdown
            disclosure={<Button onlyIcon icon={<EllipsisHorizontalIcon />} />}
            items={[
              {
                text: "Create",
                onClick: () => console.log("create"),
              },
              {
                text: "Edit",
                onClick: () => console.log("edit"),
              },
              {
                text: "Delete",
                onClick: () => console.log("delete"),
              },
              {
                text: "Exit / Logout System",
                onClick: () => console.log("logout"),
              },
            ]}
          />
        </div>
        <h5 className="mb-4 text-light">Notification</h5>
        <div>
          <Button onClick={() => setShowNotifications(true)}>
            Show notifications (test container)
          </Button>
          {showNotifications ? (
            <Notification.Container position="top-right">
              <Notification.Item
                kind="info"
                subject="Lorem ipsum"
                onClose={() => console.log("close info")}
              />
              <Notification.Item
                kind="info"
                subject="Lorem ipsum"
                message="Lorem ipsum lorem ipsum"
                onClose={() => console.log("close info")}
              />
              <Notification.Item
                kind="warning"
                subject="Lorem ipsum"
                message="Lorem ipsum lorem ipsum"
                onClose={() => console.log("close warning")}
              />
              <Notification.Item
                kind="success"
                subject="Lorem ipsum"
                message="Lorem ipsum lorem ipsum"
                onClose={() => console.log("close success")}
              />
              <Notification.Item
                kind="error"
                subject="Lorem ipsum"
                message="Lorem ipsum lorem ipsum"
                onClose={() => console.log("close error")}
              />
            </Notification.Container>
          ) : null}

          <div className="flex flex-col gap-3 mt-5 w-96">
            <Notification.Item
              kind="info"
              subject="Lorem ipsum"
              onClose={() => console.log("close info")}
            />
            <Notification.Item
              kind="info"
              subject="Lorem ipsum"
              message="Lorem ipsum lorem ipsum"
              onClose={() => console.log("close info")}
            />
            <Notification.Item
              kind="warning"
              subject="Lorem ipsum"
              message="Lorem ipsum lorem ipsum"
              onClose={() => console.log("close warning")}
            />
            <Notification.Item
              kind="success"
              subject="Lorem ipsum"
              message="Lorem ipsum lorem ipsum"
              onClose={() => console.log("close success")}
            />
            <Notification.Item
              kind="error"
              subject="Lorem ipsum"
              message="Lorem ipsum lorem ipsum"
              onClose={() => console.log("close error")}
            />
          </div>
        </div>
        <div className="p-12">
          <Card>
            <Checkbox
              className="mb-8"
              checked={checked}
              onChange={() => setChecked((checked) => !checked)}
              label="Testing checkbox"
            />
            <Select
              label="This is a select"
              isClearable
              loading
              icon={<UserGroupIcon />}
              isMulti
              tooltip="Hi"
              error={error}
              getOptionLabel={(option) => option.name}
              className="mb-8"
              options={persons}
            />
            <ThemeSelect />
            <Input
              className="mb-8"
              leftIcon={<AcademicCapIcon />}
              rightIcon={<ArchiveBoxXMarkIcon />}
              tooltip="Helper tooltip"
              label="First input"
              placeholder="Testing place holder"
              hint="This is a hint text so long to test he box model in this input field"
              error={error}
              color="over-ghost"
              onBlur={validate}
            />
            <TextArea
              className="mb-8"
              color="over-ghost"
              leftIcon={<AcademicCapIcon />}
              rightIcon={<ArchiveBoxXMarkIcon />}
              tooltip="Helper tooltip"
              label="Message"
              loading
              placeholder="Testing place holder"
              hint="This is a hint text so long to test he box model in this textarea field"
            />
          </Card>
        </div>
        <div className="flex mb-7">
          <Button
            loading={loading}
            kind="outline"
            onClick={toggleLoading}
            className="mr-3"
            color={currentColor}
          >
            Base
          </Button>
          <Button
            color={currentColor}
            kind="outline"
            icon={<PlusIcon />}
            className="mr-3"
          >
            default icon position
          </Button>
          <Button
            kind="outline"
            icon={<PlusIcon />}
            iconPosition="right"
            className="mr-3"
            color={currentColor}
          >
            icon right
          </Button>
        </div>
        <div className="flex mb-7">
          <Button
            color={currentColor}
            loading={loading}
            kind="ghost"
            className="mr-3"
          >
            Base
          </Button>
          <Button
            color={currentColor}
            kind="ghost"
            icon={<PlusIcon />}
            className="mr-3"
          >
            default icon position
          </Button>
          <Button
            color={currentColor}
            kind="ghost"
            icon={<PlusIcon />}
            iconPosition="right"
            className="mr-3"
          >
            icon right
          </Button>
        </div>
        <div className="flex mb-7">
          <Button
            color={currentColor}
            loading={loading}
            block
            onClick={toggleLoading}
          >
            Base
          </Button>
        </div>
        <div>
          <Link href="test1">Test Link</Link>
          <Link className="ml-2" href="test12">
            Test1 Link
          </Link>
        </div>
        <div>
          <Button
            color={currentColor}
            icon={<PlusIcon />}
            onlyIcon
            className="mr-3"
          />
          <div>
            <Button
              color={currentColor}
              kind="solid"
              icon={<PlusIcon />}
              onlyIcon
              className="mr-3"
            />
          </div>
          <div>
            <Button
              color={currentColor}
              kind="outline"
              icon={<PlusIcon />}
              onlyIcon
              className="mr-3"
            />
          </div>
          <div>
            <Button
              color={currentColor}
              kind="ghost"
              icon={<PlusIcon />}
              onlyIcon
              className="mr-3"
            />
          </div>
        </div>
        <Card>
          <Heading kind="display">Display</Heading>
          <Heading kind="sub-display">SubDisplay</Heading>
          <Heading kind="h2">H1 Display</Heading>
          <Heading kind="h2">H2 Display</Heading>
          <Heading kind="h3">H3 Display</Heading>
          <Heading kind="h4">H4 Display</Heading>
          <Heading kind="h5">H5 Display</Heading>
          <Heading kind="h6">H6 Display</Heading>
          <Heading kind="subtitle-1">H5 Subtitle 1</Heading>
          <Heading kind="subtitle-2">H6 Subtitle</Heading>
        </Card>
        <div className="mt-12">
          <Tooltip content={"this is a tooltip"}>
            <p className="w-7">hover</p>
          </Tooltip>
        </div>
        <div>
          <Label tooltip="hi">This is a label</Label>
        </div>
        <div>
          <HelperText color="error">I'm a helper text</HelperText>
        </div>
        <div>
          <LoadingLine />
          <Input
            className="mb-8"
            leftIcon={<AcademicCapIcon />}
            rightIcon={<ArchiveBoxXMarkIcon />}
            tooltip="Helper tooltip"
            label="First input"
            loading
            type="number"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
          />
          <Input
            className="mb-8"
            leftIcon={<AcademicCapIcon />}
            tooltip="Helper tooltip"
            label="First input"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
          />
          <Input
            className="mb-8"
            rightIcon={<ArchiveBoxXMarkIcon />}
            tooltip="Helper tooltip"
            label="First input"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
          />
          <Input
            className="mb-8"
            type="password"
            label="Password"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
          />
          <Input
            className="mb-8"
            tooltip="Helper tooltip"
            label="First input"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
          />
          <Input
            className="mb-8"
            tooltip="Helper tooltip"
            label="First input"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
            disabled
          />
          <Input
            className="mb-8"
            tooltip="Helper tooltip"
            label="First input"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
            value="Hello"
            disabled
          />
          <Icon svg={<XMarkIcon />} size="big" />
          <Input
            className="mb-8"
            leftIcon={<AcademicCapIcon />}
            rightIcon={<ArchiveBoxXMarkIcon />}
            tooltip="Helper tooltip"
            label="First input"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this input field"
            error={error}
            onBlur={validate}
            disabled
          />
        </div>
        <div>
          <TextArea
            className="mb-8"
            leftIcon={<AcademicCapIcon />}
            rightIcon={<ArchiveBoxXMarkIcon />}
            tooltip="Helper tooltip"
            label="First textarea"
            placeholder="Testing place holder"
            hint="This is a hint text so long to test he box model in this textarea field"
            defaultValue="Lorem Ipsum"
          />
        </div>
        <Title>Lorem ipsum</Title>
        <Divider />
        <Result kind="success" description={<h4>Success example</h4>} />
        <Result kind="error" description={<h4>Error example</h4>} />
        <Result kind="info" description={<h4>Info example</h4>} />
        <Empty />
        <UploadInput
          className="mb-8"
          onChange={(e) => {
            console.log(e);
          }}
          label="Upload single file"
        />
        <Checkbox
          className="mb-8"
          checked={checked}
          tooltip="hi"
          error="This is an important error"
          onChange={() => setChecked((checked) => !checked)}
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
        />
        <Radio
          className="mb-2"
          name="test"
          value="1"
          disabled
          tooltip="hi"
          label=" Radio Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
        />
        <Radio
          className="mb-2"
          name="test"
          value="2"
          tooltip="hi"
          error="This is an important error"
          label=" Radio Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
        />
        <UploadInput
          tooltip="Hello"
          className="mb-8"
          multiple
          label="Upload multiple files"
          rightIcon={file && "x"}
          rightIconAction={() => {
            fileInput.current.value = null;
            setFile(null);
          }}
          onChange={(e) => {
            setFile(e.target && e.target.files ? e.target.files[0] : null);
          }}
          ref={fileInput}
        />
        <div className="flex flex-col w-full mt-12 lg:flex-row mb-7">
          {tags?.map((tag, index) => (
            <Tag
              className="mx-1"
              color="primary"
              key={`0-${tag}`}
              id={`${index}`}
              text={tag}
              size="small"
            />
          ))}
          <Tag
            className="mx-1"
            color="primary"
            text="600"
            size="small"
            circle
          />
        </div>
        <div className="flex flex-col w-full mt-12 lg:flex-row mb-7">
          {tags?.map((tag, index) => (
            <Tag
              className="mx-1"
              color="primary"
              key={`1-${tag}`}
              id={`${index}`}
              text={tag}
              size="normal"
              action={deleteTag}
            />
          ))}
        </div>
        <div className="mt-12 mb-10">
          <List>
            <List.Head>
              {valuesTags?.map((value) => (
                <List.Header key={value}>{value}</List.Header>
              ))}
            </List.Head>
            <List.Body>
              {listData?.map((item, index) => (
                <List.Row key={`${index}-${item.length}`}>
                  {item.map((col) => (
                    <List.Data key={`${index}-${col}`}>{col}</List.Data>
                  ))}
                </List.Row>
              ))}
            </List.Body>
          </List>
        </div>
        <div className="mt-10 mb-10 ">
          <Pagination
            current={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
            total={50}
          />
        </div>
        <Skeleton>
          <Skeleton.Avatar shape="squared" />
          <Skeleton.Text kind="title" />
          <Skeleton.Text kind="subtitle" />
          <Skeleton.Text rows={3} lastHalf />
        </Skeleton>
        <div className="relative p-5 border-2">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae id
            adipisci fugiat odio laborum. Totam temporibus fuga ullam ex
            reprehenderit, debitis quae error provident molestias alias, nam
            asperiores sit illo! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Corporis libero numquam minus accusamus aut quos
            alias blanditiis inventore sit impedit, veniam cum? Deleniti sed
            mollitia numquam, eos illum officia reprehenderit. Lorem ipsum dolor
            sit amet consectetur, adipisicing elit. Nulla corporis enim maxime
            libero hic amet autem cum praesentium ab iusto adipisci architecto,
            ratione alias, officiis nam molestiae laboriosam. Veritatis,
            laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatem cupiditate deserunt hic qui inventore! Dolor vero quas,
            dolorem corporis qui quidem minima inventore earum placeat nihil,
            iusto, nobis enim repudiandae!
          </h2>
          <Overlay portal={false} behindNavigation />
        </div>
        <Drawer
          isOpen={isOpen}
          close={closeDrawer}
          placement="left"
          header={<Drawer.Header title="Lorem ipsum" />}
        >
          <Heading kind="h3">H3 Display</Heading>
          <Heading kind="h5">H5 Display</Heading>
          <Heading kind="h6">H6 Display</Heading>
          <Heading kind="subtitle-1">H5 Subtitle 1</Heading>
          <Heading kind="subtitle-2">H6 Subtitle</Heading>
        </Drawer>
        <Button color={currentColor} onClick={showDrawer} className="mr-3">
          Show Drawer
        </Button>
        <div className="flex flex-row w-full mt-12 mb-12">
          <Stepper>
            <Stepper.StepHeader current={current}>
              {steps?.map((item, index) => (
                <Stepper.Step
                  current={current}
                  key={`${item?.title}-${index}`}
                  step={item?.step}
                  title={item?.title}
                  icon={<InformationCircleIcon />}
                  description={item?.description}
                  onClick={() => {
                    setSteps((steps) => {
                      return [
                        ...steps.slice(0, index),
                        {
                          ...steps?.[index],
                          status: item?.status === "ready" ? "ready" : "base",
                        },
                        ...steps.slice(index + 1, steps?.length),
                      ];
                    });
                    setCurrent(item?.step);
                  }}
                ></Stepper.Step>
              ))}
            </Stepper.StepHeader>

            <Stepper.StepContent step={1} current={current}>
              <div className="p-5">
                <p>
                  Lorem 1 ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae id adipisci fugiat odio laborum. Totam temporibus fuga
                  ullam ex reprehenderit, debitis quae error provident molestias
                  alias, nam asperiores sit illo! Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Corporis libero numquam minus
                  accusamus aut quos alias blanditiis inventore sit impedit,
                  veniam cum? Deleniti sed mollitia numquam, eos illum officia
                  reprehenderit. Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Nulla corporis enim maxime libero hic amet
                  autem cum praesentium ab iusto adipisci architecto, ratione
                  alias, officiis nam molestiae laboriosam. Veritatis,
                  laudantium. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Voluptatem cupiditate deserunt hic qui inventore! Dolor
                  vero quas, dolorem corporis qui quidem minima inventore earum
                  placeat nihil, iusto, nobis enim repudiandae!
                </p>
              </div>
            </Stepper.StepContent>
            <Stepper.StepContent step={2} current={current}>
              <div className="p-5">
                <p>
                  Lorem 2 ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae id adipisci fugiat odio laborum. Totam temporibus fuga
                  ullam ex reprehenderit, debitis quae error provident molestias
                  alias, nam asperiores sit illo! Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Corporis libero numquam minus
                  accusamus aut quos alias blanditiis inventore sit impedit,
                  veniam cum? Deleniti sed mollitia numquam, eos illum officia
                  reprehenderit. Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Nulla corporis enim maxime libero hic amet
                  autem cum praesentium ab iusto adipisci architecto, ratione
                  alias, officiis nam molestiae laboriosam. Veritatis,
                  laudantium. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Voluptatem cupiditate deserunt hic qui inventore! Dolor
                  vero quas, dolorem corporis qui quidem minima inventore earum
                  placeat nihil, iusto, nobis enim repudiandae!
                </p>
              </div>
            </Stepper.StepContent>
            <Stepper.StepContent step={3} current={current}>
              <div className="p-5">
                <p>
                  Lorem 3 ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae id adipisci fugiat odio laborum. Totam temporibus fuga
                  ullam ex reprehenderit, debitis quae error provident molestias
                  alias, nam asperiores sit illo! Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Corporis libero numquam minus
                  accusamus aut quos alias blanditiis inventore sit impedit,
                  veniam cum? Deleniti sed mollitia numquam, eos illum officia
                  reprehenderit. Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Nulla corporis enim maxime libero hic amet
                  autem cum praesentium ab iusto adipisci architecto, ratione
                  alias, officiis nam molestiae laboriosam. Veritatis,
                  laudantium. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Voluptatem cupiditate deserunt hic qui inventore! Dolor
                  vero quas, dolorem corporis qui quidem minima inventore earum
                  placeat nihil, iusto, nobis enim repudiandae!
                </p>
              </div>
            </Stepper.StepContent>
          </Stepper>
        </div>
        <Button
          color={currentColor}
          onClick={changeStatusStep}
          className="mr-3"
        >
          Change Status
        </Button>
        <Button color={currentColor} onClick={nextStep} className="mr-3">
          Next Step
        </Button>
        <div className="flex flex-wrap gap-4 pb-10 mt-10">
          <Modal disclosure={<Button>Open Modal</Button>}>
            {(dialog) => (
              <>
                <Modal.Header
                  onClose={() => {
                    dialog.hide();
                  }}
                >
                  This is a modal title
                </Modal.Header>
                <Modal.Body>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  saepe ipsam, repellat illo iusto atque veritatis illum optio
                  quo eum eius quis magni nemo quae, distinctio quibusdam
                  placeat consequatur accusamus! Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit.
                </Modal.Body>
                <div className="flex">
                  <Button
                    block
                    kind="ghost"
                    onClick={() => {
                      dialog.hide();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    block
                    onClick={() => {
                      dialog.hide();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </>
            )}
          </Modal>
          <Modal disclosure={<Button>Open Long Modal</Button>}>
            {(dialog) => (
              <>
                <Modal.Header
                  onClose={() => {
                    dialog.hide();
                  }}
                >
                  This is a modal title with a long text inside to show user a
                  correct way to use it.
                </Modal.Header>
                <Modal.Body
                  style={{
                    height: "120vh",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  saepe ipsam
                </Modal.Body>
                <div className="flex">
                  <Button
                    block
                    kind="ghost"
                    onClick={() => {
                      dialog.hide();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    block
                    onClick={() => {
                      dialog.hide();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </>
            )}
          </Modal>
        </div>
        <div className="mt-10 mb-10">
          <Dropzone options={{ onDrop, multiple: true }}>
            {(dropzoneState) => {
              return (
                <div className="mt-6">
                  {files.length
                    ? files?.map((file: File, index) => (
                        <Tag
                          key={`${file?.name}-${index}`}
                          id={`${index}`}
                          text={file?.name}
                          action={deleteFile}
                        />
                      ))
                    : null}
                  {dropzoneState.isFocused ? (
                    <p className="mt-6">Is focussed (State from dropzone)</p>
                  ) : (
                    <p className="mt-6">Is not Focused (State from dropzone)</p>
                  )}
                </div>
              );
            }}
          </Dropzone>
        </div>
        <TitleWithIcon icon={<ArchiveBoxXMarkIcon />}>
          Testing card title
        </TitleWithIcon>
      </Container>
    </>
  );
};

type Row = {
  id: string;
  values: string[];
};

const DndTable: FC<{ prefix: string }> = ({ prefix }) => {
  const [ordering, setOrdering] = useState("");
  const [paginationState, setPaginationState] = useState(1);
  const [tableItems, setTableItems] = useState<Row[]>([
    {
      id: "1",
      values: ["John", "Doe", "30"],
    },
    {
      id: "2",
      values: ["Jane", "Doe", "30"],
    },
    {
      id: "3",
      values: ["Carl", "Doe", "30"],
    },
  ]);

  const { setNodeRef } = useDroppable({
    id: `table-body-${prefix}`,
  });

  const defaultHandlers = {
    onDragStart() {
      console.log("onDragStart");
    },
    onDragEnd(event: DragEndEvent) {
      const { active, over } = event;

      if (active.id !== over?.id && over && active) {
        setTableItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }

      console.log(active.data);
    },
    onDragCancel() {
      console.log("onDragCancel");
    },
  };

  return (
    <Card className="my-4" padding={false}>
      <Table
        spreadsheet
        style={{
          tableLayout: "fixed",
        }}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header
              style={{
                width: "50px",
              }}
            ></Table.Header>
            <Table.Header
              ordering={ordering}
              orderingKey="firstname"
              onOrdering={(ordering) => {
                setOrdering(ordering);
              }}
            >
              Firstname
            </Table.Header>
            <Table.Header
              ordering={ordering}
              orderingKey="lastname"
              onOrdering={(ordering) => {
                setOrdering(ordering);
              }}
            >
              Lastname
            </Table.Header>
            <Table.Header>Age</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.DroppableBody
          ref={setNodeRef}
          id={`example-${prefix}`}
          items={tableItems.map((item) => ({
            ...item,
            id: `${item.id}-${prefix}`,
          }))}
          sensorDelay={0}
          {...defaultHandlers}
        >
          {tableItems.map((row, index) => {
            return (
              <Table.DraggableRow
                key={`${row.id}`}
                id={`${row.id}-${prefix}`}
                data={row}
              >
                {(sortableState) => {
                  return (
                    <>
                      <Table.Data spreadsheetLineColor="classic">
                        {row.id !== "2" ? (
                          <Button
                            onlyIcon
                            icon={<ArrowsUpDownIcon />}
                            {...sortableState.listeners}
                            kind="ghost"
                            size="small"
                          />
                        ) : null}
                      </Table.Data>
                      {row.values.map((col) => (
                        <Table.Data
                          key={`${index}-${col}-${prefix}`}
                          spreadsheetLineColor="classic"
                          secondSlot={({ setSecondSlot }) => {
                            return (
                              <SecondarySlot
                                key={`${index}-${col}-${prefix}`}
                                value={col}
                                onClick={() => setSecondSlot(false)}
                              />
                            );
                          }}
                        >
                          {col}
                        </Table.Data>
                      ))}
                    </>
                  );
                }}
              </Table.DraggableRow>
            );
          })}
        </Table.DroppableBody>
      </Table>
      <Table.Pagination
        total={0}
        current={paginationState}
        onChangePage={(e: number) => setPaginationState(e)}
      />
    </Card>
  );
};

const SecondarySlot: FC<{ value: string; onClick?: () => void }> = ({
  value,
  onClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
    if (inputRef?.current && "value" in inputRef.current) {
      inputRef.current.value = value;
    }
  }, []);

  return (
    <form className="flex w-1/2">
      <Input ref={inputRef} color="over-ghost" />
      <Button
        onlyIcon
        icon={<CheckIcon />}
        onClick={() => onClick?.()}
        className="w-[37px] h-[37px]"
        type="submit"
      />
    </form>
  );
};

type Item = {
  id: string;
  label: string;
};

type ContainerData = {
  [key: string]: Item[];
};

interface SortableItemProps {
  id: string;
  content: Item;
}

const initialContainersData: ContainerData = {
  first: [
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
    { id: "3", label: "Item 3" },
  ],
  second: [
    { id: "4", label: "Item A" },
    { id: "5", label: "Item B" },
    { id: "6", label: "Item C" },
  ],
};

const SortableItem: FC<SortableItemProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, data: props.content });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.content.label}
    </li>
  );
};

const MultiContainerSortable: React.FC = () => {
  const [containers, setContainers] = useState<ContainerData>(
    initialContainersData
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    console.log({ event });

    const { active, over } = event;
    if (active && over) {
      const activeContainer = active.id.split("-")[0];
      const overContainer = over.id.split("-")[0];

      const activeItems = containers[activeContainer];
      const overItems = containers[overContainer];

      const activeItem = activeItems.find(
        (item) => `${activeContainer}-${item.id}` === active.id
      );

      if (!activeItem) return;

      if (activeContainer === overContainer) {
        const oldIndex = activeItems.findIndex(
          (item) => item.id === activeItem.id
        );
        const newIndex = activeItems.findIndex(
          (item) => item.id === over?.data?.current?.id
        );
        const reorderedItems = arrayMove(activeItems, oldIndex, newIndex);
        setContainers({
          ...containers,
          [activeContainer]: reorderedItems,
        });
      } else {
        const newActiveItems = activeItems.filter(
          (item) => item !== activeItem
        );
        const newOverItems = [...overItems];
        const finalOverIndex = overItems.findIndex(
          (item) => item.id === over?.data?.current?.id
        );
        newOverItems.splice(finalOverIndex, 0, activeItem);
        setContainers({
          ...containers,
          [activeContainer]: newActiveItems,
          [overContainer]: newOverItems,
        });
      }
    }
  };

  const allItems = Object.entries(containers).flatMap(([containerId, items]) =>
    items.map((item) => `${containerId}-${item.id}`)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={allItems} strategy={verticalListSortingStrategy}>
        {Object.keys(containers).map((containerId) => (
          <ul key={containerId} style={{ border: "1px solid red" }}>
            {containers[containerId].map((item) => (
              <SortableItem
                key={item.id}
                id={`${containerId}-${item.id}`}
                content={item}
              />
            ))}
          </ul>
        ))}
      </SortableContext>
    </DndContext>
  );
};

const AppWrapper = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};
export default AppWrapper;
