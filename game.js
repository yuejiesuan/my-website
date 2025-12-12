// 游戏逻辑
class RedMansionPoemGame {
    constructor() {
        this.currentLevel = 0;
        this.totalScore = 0;
        this.poemsData = poemsData;
        this.isGameOver = false;
        
        // 获取DOM元素
        this.currentLevelElement = document.getElementById('current-level');
        this.totalLevelsElement = document.getElementById('total-levels');
        this.totalScoreElement = document.getElementById('total-score');
        this.questionTextElement = document.getElementById('question-text');
        this.userAnswerElement = document.getElementById('user-answer');
        this.submitBtnElement = document.getElementById('submit-btn');
        this.feedbackSectionElement = document.getElementById('feedback-section');
        this.scoreResultElement = document.getElementById('score-result');
        this.scoreFillElement = document.getElementById('score-fill');
        this.explanationContentElement = document.getElementById('explanation-content');
        this.nextBtnElement = document.getElementById('next-btn');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartBtnElement = document.getElementById('restart-btn');
        
        // 初始化游戏
        this.init();
    }
    
    // 初始化游戏
    init() {
        // 设置事件监听
        this.submitBtnElement.addEventListener('click', () => this.checkAnswer());
        this.nextBtnElement.addEventListener('click', () => this.nextLevel());
        this.restartBtnElement.addEventListener('click', () => this.restartGame());
        this.userAnswerElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // 设置总关卡数
        this.totalLevelsElement.textContent = this.poemsData.length;
        
        // 加载第一关
        this.loadLevel();
    }
    
    // 加载关卡
    loadLevel() {
        if (this.currentLevel >= this.poemsData.length) {
            this.endGame();
            return;
        }
        
        const poem = this.poemsData[this.currentLevel];
        
        // 更新关卡信息
        this.currentLevelElement.textContent = this.currentLevel + 1;
        
        // 移除所有提示信息
        
        // 直接显示诗句
        this.questionTextElement.textContent = poem.question;
        
        // 重置输入和反馈
        this.userAnswerElement.value = '';
        this.feedbackSectionElement.style.display = 'none';
        
        // 聚焦输入框
        this.userAnswerElement.focus();
    }
    
    // 检查答案
    checkAnswer() {
        const userAnswer = this.userAnswerElement.value.trim();
        const poem = this.poemsData[this.currentLevel];
        const correctAnswer = poem.missingPart;
        
        // 计算得分
        const score = this.calculateScore(userAnswer, correctAnswer);
        
        // 更新总分
        this.totalScore += score;
        this.totalScoreElement.textContent = this.totalScore;
        
        // 显示反馈
        this.showFeedback(score, userAnswer, correctAnswer, poem.explanation);
    }
    
    // 计算得分
    calculateScore(userAnswer, correctAnswer) {
        // 完全正确
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            return 100;
        }
        
        // 部分正确（考虑同音字和近似答案）
        const userChars = userAnswer.replace(/\s/g, '');
        const correctChars = correctAnswer.replace(/\s/g, '');
        
        // 计算字符匹配度
        let matchedChars = 0;
        for (let i = 0; i < Math.min(userChars.length, correctChars.length); i++) {
            if (userChars[i].toLowerCase() === correctChars[i].toLowerCase()) {
                matchedChars++;
            }
        }
        
        // 计算匹配率
        const matchRate = matchedChars / correctChars.length;
        
        // 根据匹配率计算得分
        if (matchRate >= 0.8) {
            return 80;
        } else if (matchRate >= 0.6) {
            return 60;
        } else if (matchRate >= 0.4) {
            return 40;
        } else if (matchRate >= 0.2) {
            return 20;
        } else {
            return 0;
        }
    }
    
    // 显示反馈
    showFeedback(score, userAnswer, correctAnswer, explanation) {
        // 更新得分显示
        this.scoreResultElement.textContent = `得分: ${score}/100`;
        
        // 更新进度条
        this.scoreFillElement.style.width = `${score}%`;
        
        // 更新解析内容
        let explanationHtml = `<p><strong>正确答案:</strong> ${correctAnswer}</p>`;
        if (userAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
            explanationHtml += `<p><strong>你的答案:</strong> ${userAnswer}</p>`;
        }
        explanationHtml += `<p><strong>解析:</strong> ${explanation}</p>`;
        this.explanationContentElement.innerHTML = explanationHtml;
        
        // 显示反馈部分
        this.feedbackSectionElement.style.display = 'block';
    }
    
    // 下一关
    nextLevel() {
        this.currentLevel++;
        
        if (this.currentLevel < this.poemsData.length) {
            this.loadLevel();
        } else {
            this.endGame();
        }
    }
    
    // 结束游戏
    endGame() {
        this.isGameOver = true;
        
        // 更新最终得分
        this.finalScoreElement.textContent = this.totalScore;
        
        // 显示游戏结束界面
        this.gameOverElement.style.display = 'block';
    }
    
    // 重新开始游戏
    restartGame() {
        this.currentLevel = 0;
        this.totalScore = 0;
        this.isGameOver = false;
        
        // 重置显示
        this.totalScoreElement.textContent = this.totalScore;
        this.gameOverElement.style.display = 'none';
        this.feedbackSectionElement.style.display = 'none';
        
        // 加载第一关
        this.loadLevel();
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new RedMansionPoemGame();
});