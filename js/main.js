$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".toggle_btn").on("click", function () {
        $("#header").toggleClass("open");
    });
    // メニューのリンクをクリックした時
    $("#menu-container a").on("click", function () {
        $("#header").toggleClass("open");
    });


    /*=================================================
    トップに戻る
    ===================================================*/
    let pagetop = $("#to-top");
    pagetop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $("body,html").animate({ scrollTop: 0 }, 600);
        return false;
    });


    //リンク移動移動の停止
    $(function () {
        // .btnクラスを持つリンクの動作を無効化
        $('a.not-link').on('click', function (event) {
            event.preventDefault(); // デフォルトのリンク動作を無効化
            console.log('リンクの動作を無効化しました:', $(this).text());
        });
    });

    //ポップ
    // 全ての<dt>要素を取得
    const articles = document.querySelectorAll('#blog ul li');
    // 現在の日付を取得
    const currentDate = new Date();
    // 1週間 (7日間) のミリ秒を計算
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    // 日付が1週間以内の記事が存在するかをチェック
    let isRecentArticleFound = false;
    articles.forEach(article => {
        // <dt>の中の日付を抽出
        const articleDateText = article.textContent.trim().split(' ')[0]; // 最初の日付部分を取得
        const articleDate = new Date(articleDateText.replace(/\//g, '-')); // 日付文字列をDateオブジェクトに変換
        // 日付が1週間以内か確認
        if (currentDate - articleDate <= oneWeekInMs) {
            isRecentArticleFound = true;
        }
        // 最近の記事がある場合、ポップを表示
        if (isRecentArticleFound) {
            document.getElementById('popup-notification').style.display = 'block';
        }
        // ポップを閉じる処理
        document.querySelector('.popup').addEventListener('click', function () {
            document.getElementById('popup-notification').style.display = 'none';
        });
    });

    //スライド
    $(document).ready(function () {
        $('#slider').slick({
            infinite: true,          // 無限ループを有効にする
            autoplay: true,          // 自動でスクロール
            slidesToShow: 4,         // 画面に表示するスライド数（デフォルト）
            slidesToScroll: 1,       // スクロールするスライド数
            autoplaySpeed: 0,        // 自動再生の速度（遅延なしで流れる）
            speed: 10000,            // 流れる速さ（大きくするとゆっくり）
            cssEase: 'linear',       // 滑らかなアニメーション
            swipe: false,            // 操作による切り替えはさせない
            arrows: false,           // 左右の矢印を非表示
            dots: false,             // 下部のドットナビゲーションを非表示
            centerMode: false,       // センターモード無効
            variableWidth: true,     // 可変幅対応
            responsive: [
                {
                    breakpoint: 1000, // PCサイズ以下
                    settings: {
                        slidesToShow: 3,
                        speed: 8000,  // サイズ変更時の速度を調整
                    }
                },
                {
                    breakpoint: 768, // タブレットサイズ以下
                    settings: {
                        slidesToShow: 2,
                        speed: 7000,
                    }
                },
                {
                    breakpoint: 576, // ミニタブレットサイズ以下
                    settings: {
                        slidesToShow: 1,
                        speed: 6000,
                    }
                },
                {
                    breakpoint: 480, // スマホサイズ以下
                    settings: {
                        slidesToShow: 1,
                        speed: 6000,
                    }
                }
            ]
        });
    });

    /* 開閉ボタン */
    $('.hide-text').hide();
    $(".readmore").on("click", function () {
        $(this).toggleClass("on-click");
        $(this).prev().slideToggle();
    });


    /* もっと読むエリア表示(blogページ内) */
    $(document).ready(function () {
        // 設定: 表示件数
        const itemsToShow = 10; // 初期表示件数
        const increment = 5;    // 「もっと見る」で追加表示する件数

        // すべてのリストアイテムを取得
        const $listItems = $(".blog-list2 li");
        const totalItems = $listItems.length;

        // 初期表示: 最初の10件だけ表示
        $listItems.hide(); // 全アイテムを非表示
        $listItems.slice(0, itemsToShow).show(); // 最初の10件のみ表示

        // もっと見るボタンのクリックイベント
        $(".btn.small.more").on("click", function (e) {
            e.preventDefault();

            // 現在表示されているアイテム数
            const visibleItems = $(".blog-list2 li:visible").length;

            // 次のアイテムを表示
            $listItems.slice(visibleItems, visibleItems + increment).fadeIn();

            // すべてのアイテムが表示されたらボタンを非表示
            if (visibleItems + increment >= totalItems) {
                $(this).hide();
            }
        });
    });

    /* もっと読むエリア表示(voiceページ内) */
    $(document).ready(function () {
        const initialShow = 5;
        const increment = 5;
        const $voiceItems = $(".voice-block li");
        const totalItems = $voiceItems.length;
        $voiceItems.hide();
        $voiceItems.slice(0, initialShow).show();
        $(".btn.more2").on("click", function (e) {
            e.preventDefault();
            const visibleItems = $(".voice-block li:visible").length;
            $voiceItems.slice(visibleItems, visibleItems + increment).fadeIn();
            if (visibleItems + increment >= totalItems) {
                $(this).hide();
            }
        });
    });
});