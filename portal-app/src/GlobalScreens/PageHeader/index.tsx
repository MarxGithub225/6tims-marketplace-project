import React from "react";
interface PageHeaderProps {
  header: string
}
function PageHeader({header}: PageHeaderProps) {
  return <section className="flat-title-page inner">
  <div className="overlay" />
  <div className="themesflat-container">
    <div className="row">
      <div className="col-md-12">
        <div className="page-title-heading">
          <h1 className="heading text-center">{header}</h1>
        </div>
      </div>
    </div>
  </div>                    
</section>;
}

export default PageHeader;
