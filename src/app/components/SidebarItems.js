import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArchiveBoxIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ClipboardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export const SidebarItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    name: "Pharmacy",
    path: "/admin/pharmacy",
    icon: <BuildingStorefrontIcon className="w-5 h-5" />,
    children: [
      {
        name: "Documents",
        path: "/admin/pharmacy/documents",
        subChildren: [
          {
            name: "Document List",
            path: "/admin/pharmacy/documents/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Document",
            path: "/admin/pharmacy/documents/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        name: "Pharmacy",
        path: "/admin/pharmacy",
        subChildren: [
          {
            name: "Pharmacy List",
            path: "/admin/pharmacy/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Pharmacy",
            path: "/admin/pharmacy/add",
            icon: <PlusCircleIcon className="w-4 h-4" />,
          },
        ],
      },
    ],
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
            name: "Product List",
            path: "/admin/product/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Product",
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
            name: "Category List",
            path: "/admin/category/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Category",
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
            name: "Generic List",
            path: "/admin/generic/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Generic",
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
            name: "Manufacturer List",
            path: "/admin/manufacturer/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Manufacturer",
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
            name: "Supplier List",
            path: "/admin/supplier/list",
            icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
          },
          {
            name: "Add Supplier",
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
        name: "Inventory List",
        path: "/admin/inventory/list",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Batch",
    path: "/admin/batch",
    icon: <ArchiveBoxIcon className="w-5 h-5" />,
    children: [
      {
        name: "Batch List",
        path: "/admin/batch/list",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
      {
        name: "Create Batch",
        path: "/admin/batch/create-batch",

        icon: <PlusCircleIcon className="w-4 h-4" />,
      },
      {
        name: "Create Order",
        path: "/admin/batch/create-order",
        icon: <ClipboardIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Customer",
    path: "/admin/customer",
    icon: <UserGroupIcon className="w-5 h-5" />,
    children: [
      {
        name: "Customer List",
        path: "/admin/customer/list",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "User",
    path: "/admin/user",
    icon: <UserCircleIcon className="w-5 h-5" />,
    children: [
      {
        name: "User List",
        path: "/admin/user/list",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
];
