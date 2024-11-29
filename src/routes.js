import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const Message = React.lazy(() => import('./views/Message/message'))
const CouponList = React.lazy(() => import('./views/Message/CouponList'))
const ProductList = React.lazy(() => import('./views/CreateEmployeeProfile/ProductList'))
const CouponformData= React.lazy(() => import('./views/CreateEmployeeProfile/CouponFormData'))
const AllOrder = React.lazy(() => import('./views/Orders/AllOrder'))
const HomeCms = React.lazy(() => import('./views/CMS/HomeCms'))
const FooterCms = React.lazy(() => import('./views/CMS/FooterCms'))
const HeaderCms = React.lazy(() => import('./views/CMS/HeaderCms'))
const IndexCms = React.lazy(() => import('./views/CMS/IndexCMS'))
const Settings = React.lazy(() => import('./views/Settings/Settings'))
const EmailTemplateSettings = React.lazy(() => import('./views/Settings/EmailTemplate'))
const AdminList = React.lazy(() => import('./views/Settings/AdminList'))
const User = React.lazy(() => import('./views/User/User'))
const UserList = React.lazy(() => import('./views/User/UserList'))
// Profile
const Login = React.lazy(() => import('./views/pages/login/Login'))
const AddServiceCategory = React.lazy(() => import('./views/pages/services/AddServiceCategory'))
const ServiceCategoriesList = React.lazy(() => import('./views/pages/services/ServiceCategoriesList'))

const AddService = React.lazy(() => import('./views/pages/services/AddService'))
const ServiceList = React.lazy(() => import('./views/pages/services/ServiceList'))
const ServiceDetails = React.lazy(() => import('./views/pages/services/ServiceDetails'))

const HomePageCMS = React.lazy(() => import('./views/pages/CMS/HomePage'))

const AddBlog = React.lazy(() => import('./views/pages/CMS/blogs/AddBlog'))
const EditBlog = React.lazy(() => import('./views/pages/CMS/blogs/EditBlog'))
const BlogList = React.lazy(() => import('./views/pages/CMS/blogs/BlogList'))

const AddTestimonial = React.lazy(() => import('./views/pages/CMS/testimonials/AddTestimonial'))
const EditTestimonial = React.lazy(() => import('./views/pages/CMS/testimonials/EditTestimonial'))
const TestimonialList = React.lazy(() => import('./views/pages/CMS/testimonials/TestimonialList'))

// Create Callback
// const CreateCallback = React.lazy(() => import('./views/Leads_Create/CreateCallback'))
// const CallBackViewDetails = React.lazy(() => import('./views/Leads_Create/CallbackViewDetails'))

// Create Transfer
// const createTransfer = React.lazy(() => import('./views/Leads_Create/CreateTransfer'))
// const TransferViewDetails = React.lazy(() => import('./views/Leads_Create/TransferViewDetails'))

// Create Sales
// const createSales = React.lazy(() => import('./views/Leads_Create/Create_Sales'))
// const SaleViewDeails = React.lazy(() => import('./views/Leads_Create/SaleViewDeails'))

// Callback status
// const callbackStatus = React.lazy(() => import('./views/Leads_Status/Callback_Status'))

// Transfer status
// const transferStatus = React.lazy(() => import('./views/Leads_Status/Transfer_Status'))
const CreateEmployeeProfile = React.lazy(
  () => import('./views/CreateEmployeeProfile/CreateEmployeeProfile'),
)
const TaskerServices = React.lazy(
  () => import('./views/CreateEmployeeProfile/TaskterServices'),
)

const TaskerServicesList = React.lazy(
  () => import('./views/CreateEmployeeProfile/TaskerServicesList'),
)

const EditUserDetails = React.lazy(() => import('./views/CreateEmployeeProfile/EditEmployee'))
// Sales status
// const salesStatus = React.lazy(() => import('./views/Leads_Status/Sales_Status'))
const EmployeeList = React.lazy(() => import('./views/EmployeeActivities/EmployeeList'))
const ViewDetails = React.lazy(() => import('./views/EmployeeActivities/ViewProcess'))
const CallBackViewDetails = React.lazy(() => import('./views/EmployeeActivities/CallBackview'))
const TransferViewDetails = React.lazy(() => import('./views/EmployeeActivities/Transferview'))
const SaleViewDetails = React.lazy(() => import('./views/EmployeeActivities/Saleview'))
const CallBackList = React.lazy(() => import('./views/EmployeeActivities/CallBackList'))
const SaleList = React.lazy(() => import('./views/EmployeeActivities/SaleList'))
const TransferList = React.lazy(() => import('./views/EmployeeActivities/TransferList'))
const AttendaceList = React.lazy(() => import('./views/EmployeeActivities/AttendanceList'))
const Notification = React.lazy(() => import('./views/EmployeeActivities/Notifications'))
const NightShiftAttendance = React.lazy(
  () => import('./views/EmployeeActivities/AttendanceNightShift'),
)
const DayShiftAttendance = React.lazy(() => import('./views/EmployeeActivities/AttendanceDayShift'))
const AttendanceDaily = React.lazy(() => import('./views/EmployeeActivities/AttendanceDaily'))
const NightShift = React.lazy(() => import('./views/EmployeeActivities/NightShift'))
const DayShift = React.lazy(() => import('./views/EmployeeActivities/DayShift'))
const AllCallbacks = React.lazy(() => import('./views/EmployeeActivities/All_Callbacks'))
const AllSales = React.lazy(() => import('./views/EmployeeActivities/All_Sales'))
const AllTransfer = React.lazy(() => import('./views/EmployeeActivities/All_Transfer'))

const Best_Purchased_Product = React.lazy(() => import('./views/Purchase/Best_Purchased_Product'))
const ProductReview = React.lazy(() => import('./views/Product/ProductReview'))
const ViewOrder = React.lazy(() => import('./views/Orders/ViewOrder'))
const UpdateCoupon = React.lazy(() => import('./views/Message/UpdateCoupon'))
const ViewCoupon = React.lazy(() => import('./views/Message/ViewCoupon'))
const UpdateProduct = React.lazy(() => import('./views/CreateEmployeeProfile/UpdateProduct'))
const ManageCustomer = React.lazy(() => import('./views/Customer/ManageCustomer'))

const ProductAnalytics = React.lazy(() => import('./views/Analytics/Products'))
const RevenueAnalytics = React.lazy(() => import('./views/Analytics/Revenue'))
const OrderAnalytics = React.lazy(() => import('./views/Analytics/Orders'))
const TaxAnalytics = React.lazy(() => import('./views/Analytics/Taxes'))
const StockAnalytics = React.lazy(() => import('./views/Analytics/Stocks'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },

  { path: '/Login', name: 'Login', element: Login, exact: true },
  // { path: '/message', name: 'Coupon', element: Message, exact: true },
  // { path: '/coupon-list', name: 'Coupon list', element: CouponList, exact: true },
  // { path: '/view-coupon', name: 'View Coupon', element: ViewCoupon, exact: true },

  // { path: '/update-coupon/:id', name: 'Coupon list', element: UpdateCoupon, exact: true },
  // { path: '/home-cms', name: 'Home CMS', element: HomeCms, exact: true },
  // { path: '/footer-cms', name: 'Footer CMS', element: FooterCms, exact: true },
  // { path: '/header-cms', name: 'Header CMS', element: HeaderCms, exact: true },
  // { path: '/index-cms', name: 'Index CMS', element: IndexCms, exact: true },

  // { path: '/update-coupon/:id', name: 'Update coupon', element: UpdateCoupon, exact: true },

  { path: '/tasker-list', name: 'Tasker-list', element: ProductList, exact: true },
  { path: '/create-tasker-list', name: 'Create-Tasker-list', element: CreateEmployeeProfile, exact: true },
  { path: '/create-tasker-services/:id', name: 'Create-Tasker-Services', element: TaskerServices, exact: true },
  { path: '/tasker-services-list', name: 'Tasker-Services-List', element: TaskerServicesList, exact: true },
  { path: '/client_list', name: 'client_List', element: CouponformData, exact: true },

  { path: '/add-service', name: 'Add-Service', element: AddService, exact: true },
  { path: '/service-list', name: 'Service-List', element: ServiceList, exact: true },
  { path: '/service-details/:id', name: 'Service-Details', element: ServiceDetails, exact: true },

  { path: '/add-service-category', name: 'Add-Service-Category', element: AddServiceCategory, exact: true },
  { path: '/service-categories-list', name: 'Service-Categories-List', element: ServiceCategoriesList, exact: true },
  { path: '/home-page', name: 'Home-Page-CMS', element: HomePageCMS, exact: true },

  { path: '/add-blog', name: 'Add-Blog', element: AddBlog, exact: true },
  { path: '/edit-blog/:id', name: 'Edit-Blog', element: EditBlog, exact: true },
  { path: '/blogs-list', name: 'Blog-List', element: BlogList, exact: true },

  { path: '/add-testimonial', name: 'Add-Testimonial', element: AddTestimonial, exact: true },
  { path: '/edit-testimonial/:id', name: 'Edit-Blog', element: EditTestimonial, exact: true },
  { path: '/testimonials-list', name: 'Blog-List', element: TestimonialList, exact: true },

  // { path: '/update-product/:id', name: 'Update product', element: UpdateProduct, exact: true },
  // { path: '/order-list', name: 'Order list', element: AllOrder, exact: true },
  // { path: '/view-order/:id', name: 'View Order', element: ViewOrder, exact: true },
  // { path: '/create-leads-profile', name: 'Create-Provider', element: CreateEmployeeProfile, exact: true },

  // {
  //   path: '/best-purchase-product',
  //   name: 'Best Selling Product',
  //   element: Best_Purchased_Product,
  //   exact: true,
  // },
  // { path: '/product-review', name: 'Product Review', element: ProductReview, exact: true },

  { path: '/manage-customer', name: 'Manage Customer', element: ManageCustomer, exact: true },

  // { path: '/settings', name: 'Settings', element: Settings, exact: true },
  // {
  //   path: '/settings/email-template/:id',
  //   name: 'Settings',
  //   element: EmailTemplateSettings,
  //   exact: true,
  // },
  // { path: '/admin-list', name: 'Admin List', element: AdminList, exact: true },
  // { path: '/user', name: 'User', element: User, exact: true },
  // { path: '/user-list', name: 'User_List', element: UserList, exact: true },

  // { path: '/product-analytics', name: 'Product', element: ProductAnalytics, exact: true },
  // { path: '/revenue-analytics', name: 'Revenue', element: RevenueAnalytics, exact: true },
  // { path: '/order-analytics', name: 'Order', element: OrderAnalytics, exact: true },
  // { path: '/tax-analytics', name: 'Tax', element: TaxAnalytics, exact: true },
  // { path: '/stock-analytics', name: 'Stock', element: StockAnalytics, exact: true },
]

export default routes
