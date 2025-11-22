import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ListBulletIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export const SidebarItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <HomeIcon className="w-5 h-5" />,
  },

  {
    name: "Product",
    path: "/admin/product",
    icon: <CubeIcon className="w-5 h-5" />,
    children: [
      {
        name: "Product",
        path: "/admin/product/list",
        subChildren: [
          {
            name: "List",
            path: "/admin/product/list",
            icon: <ListBulletIcon className="w-4 h-4" />,
          },
          {
            name: "Add",
            path: "/admin/product/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Category",
        path: "/admin/category/add",
        subChildren: [
          {
            name: "List",
            path: "/admin/category/list",
            icon: <ListBulletIcon className="w-4 h-4" />,
          },
          {
            name: "Add",
            path: "/admin/category/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Generic",
        path: "/admin/generic/add",
        subChildren: [
          {
            name: "List",
            path: "/admin/generic/list",
            icon: <ListBulletIcon className="w-4 h-4" />,
          },
          {
            name: "Add",
            path: "/admin/generic/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Manufacturer",
        path: "/admin/manufacturer/add",
        subChildren: [
          {
            name: "List",
            path: "/admin/manufacturer/list",
            icon: <ListBulletIcon className="w-4 h-4" />,
          },
          {
            name: "Add",
            path: "/admin/manufacturer/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Supplier",
        path: "/admin/supplier/add",
        subChildren: [
          {
            name: "List",
            path: "/admin/supplier/list",
            icon: <ListBulletIcon className="w-4 h-4" />,
          },
          {
            name: "Add",
            path: "/admin/supplier/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
    ],
  },

  {
    name: "Inventory",
    path: "/admin/inventory",
    icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
    children: [
      {
        name: "Update Inventory",
        path: "/admin/inventory/update",
        icon: <ArchiveBoxIcon className="w-4 h-4" />,
      },
    ],
  },
];
