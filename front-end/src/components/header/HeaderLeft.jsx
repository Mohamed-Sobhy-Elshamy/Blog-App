import CreateIcon from '@mui/icons-material/Create';


const HeaderLeft = ({toggle, setToggle}) => {
        return(
            <div className="header-left">
            <div className="header-logo">
                <strong>BLOG</strong>
                    <CreateIcon className='icon-blog' />
            </div>
            <div onClick={() => setToggle(prev => !prev)} className="header-menu">
                    {/* <MenuIcon className='icon' /> */}
                    {toggle ?  <i class="bi bi-x-circle-fill icon-toggle"></i>: <i  class="bi bi-list icon-toggle"></i> }
            </div>
        </div>
    )
}

export default HeaderLeft;
