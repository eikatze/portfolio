# 영상 포트폴리오 템플릿

정적 HTML/CSS/JS 기반의 영상 포트폴리오 템플릿입니다. 사이트 콘텐츠는 `data/site.json` 한 파일로 관리하고, `admin/` 페이지에서 값을 편집한 뒤 JSON을 복사해 반영하는 흐름을 사용합니다.

## 편집 흐름

1. `admin/index.html`을 열어 브랜드, 히어로, 작업물, 가격, 문의 정보를 수정합니다.
2. JSON 탭에서 결과를 복사하거나 `site.json`을 다운로드합니다.
3. 생성한 내용을 `data/site.json`에 반영합니다.
4. 정적 페이지인 `index.html`, `pricing.html`, `contact.html`에서 결과를 확인합니다.

## 템플릿 기본값

- 기본 브랜드: `studio / your-name`
- 기본 문의: `Email / your@email.com`
- 프로젝트/통계/작업물 섹션은 빈 템플릿 상태에서 과하게 보이지 않도록 기본 비활성화되어 있습니다.
